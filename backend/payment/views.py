from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Address, Payment, Order
from .serializers import AddressSerializer, OrderSerializer, PaymentSerializer
from cart.models import Cart
import stripe
import paypalrestsdk

# Set Stripe API key
stripe.api_key = settings.STRIPE_SECRET_KEY

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET,
})


class AddAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Fetch the first unprocessed order for the user
        order = Order.objects.filter(
            customer=request.user, order_status="received").first()
        if not order:
            return Response({"error": "No active order found for this user."}, status=status.HTTP_400_BAD_REQUEST)

        # Use default address if requested
        if request.data.get("use_default", False):
            address = Address.objects.filter(
                user=request.user, is_default=True).first()
            if address:
                order.address = address
                order.save()
                return Response({"success": "Default address applied to the order."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No default address found for the user."}, status=status.HTTP_400_BAD_REQUEST)

        # Add a new address
        serializer = AddressSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        address = serializer.save(user=request.user)

        # Set the new address as default if requested
        if request.data.get("is_default", False):
            Address.objects.filter(
                user=request.user, is_default=True).update(is_default=False)
            address.is_default = True
            address.save()

        # Associate the new address with the order
        order.address = address
        order.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(customer=self.request.user)

    def retrieve(self, request, pk=None):
        order = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer(order)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        order = get_object_or_404(self.get_queryset(), pk=pk)
        cart = order.cart
        order.delete()
        cart.delete()
        return Response({"message": "Order and associated cart deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    def create(self, request):
        cart_id = request.data.get("cart_id")
        cart = get_object_or_404(Cart, id=cart_id, customer=request.user)
        address_id = request.data.get("address_id")
        address = get_object_or_404(Address, id=address_id, user=request.user)

        # Create order
        order = Order.objects.create(
            customer=request.user,
            cart=cart,
            address=address,
            subtotal=cart.total,
            discount=3,  # Apply any discount logic here
            total=cart.total - 3,
        )
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Retrieve and validate payment method
            payment_method = request.data.get("payment_method")
            if payment_method not in ["stripe", "paypal", "credit_card"]:
                return Response({"error": "Invalid payment method."}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve and validate order
            order = get_object_or_404(
                Order, customer=request.user, payment_complete=False
            )
            amount = float(order.total)

            if payment_method == "stripe":
                # Handle Stripe payment
                token = request.data.get("stripe_token")
                if not token:
                    return Response({"error": "Stripe token is required."}, status=status.HTTP_400_BAD_REQUEST)

                try:
                    charge = stripe.Charge.create(
                        amount=int(amount * 100),  # Convert to cents
                        currency="usd",
                        source=token,
                        description=f"Payment for Order #{
                            order.id} by {request.user.username}",
                    )

                    # Record payment and update order
                    payment = Payment.objects.create(
                        customer=request.user,
                        payment_method="stripe",
                        payment_id=charge.id,
                        amount_paid=amount,
                        status=True,
                    )
                    order.payment = payment
                    order.payment_complete = True
                    order.order_status = "completed"
                    order.save()

                    return Response({"success": "Payment successful.", "order_id": order.id}, status=status.HTTP_200_OK)

                except stripe.error.StripeError as e:
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            elif payment_method == "paypal":
                # Handle PayPal payment
                paypal_payment = paypalrestsdk.Payment({
                    "intent": "sale",
                    "payer": {"payment_method": "paypal"},
                    "transactions": [{
                        "amount": {"total": f"{amount:.2f}", "currency": "USD"},
                        "description": f"Payment for Order #{order.id}",
                    }],
                    "redirect_urls": {
                        "return_url": request.data.get("return_url", "http://localhost:8000/payment-success/"),
                        "cancel_url": request.data.get("cancel_url", "http://localhost:8000/payment-cancel/"),
                    },
                })

                if paypal_payment.create():
                    payment = Payment.objects.create(
                        customer=request.user,
                        payment_method="paypal",
                        payment_id=paypal_payment.id,
                        amount_paid=amount,
                        status=True,
                    )
                    order.payment = payment
                    order.payment_complete = True
                    order.order_status = "completed"
                    order.save()

                    return Response({
                        "success": "PayPal payment initiated.",
                        # Approval URL
                        "redirect_url": paypal_payment["links"][1]["href"]
                    }, status=status.HTTP_200_OK)

                else:
                    return Response({"error": "PayPal payment creation failed."}, status=status.HTTP_400_BAD_REQUEST)

            elif payment_method == "credit_card":
                # Example handling for credit card (custom implementation required)
                payment_id = "CREDIT_CARD_PAYMENT_ID"  # Replace with actual logic
                payment = Payment.objects.create(
                    customer=request.user,
                    payment_method="credit_card",
                    payment_id=payment_id,
                    amount_paid=amount,
                    status=True,
                )
                order.payment = payment
                order.payment_complete = True
                order.order_status = "completed"
                order.save()

                return Response({"success": "Credit card payment successful.", "order_id": order.id}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
