from .serializers import OrderSerializer
from .models import Address, Order
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Address, Payment, Order
from .serializers import AddressSerializer, OrderSerializer
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
        order = Order.objects.filter(
            customer=request.user, order_status="received").first()
        if not order:
            return Response({"error": "No active order found."}, status=status.HTTP_400_BAD_REQUEST)

        if request.data.get("use_default", False):
            address = Address.objects.filter(
                user=request.user, is_default=True).first()
            if address:
                order.address = address
                order.save()
                return Response({"success": "Default address applied."}, status=status.HTTP_200_OK)
            return Response({"error": "No default address found."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AddressSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        address = serializer.save(user=request.user)

        if request.data.get("is_default", False):
            Address.objects.filter(
                user=request.user, is_default=True).update(is_default=False)
            address.is_default = True
            address.save()

        order.address = address
        order.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Retrieve all orders for the authenticated user."""
        orders = Order.objects.filter(customer=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Create multiple orders per farmer from a cart."""
        cart_id = request.data.get("cart_id")
        cart = get_object_or_404(Cart, id=cart_id, customer=request.user)
        address_id = request.data.get("address_id")
        address = get_object_or_404(Address, id=address_id, user=request.user)

        orders = []
        for item in cart.items.all():
            order = Order.objects.create(
                customer=request.user,
                cart=cart,
                address=address,
                farmer=item.product.farmer,
                subtotal=item.product.price * item.quantity,
                discount=3,  # Modify discount logic as needed
                total=(item.product.price * item.quantity) - 3,
            )
            orders.append(order)

        return Response({"orders": OrderSerializer(orders, many=True).data}, status=status.HTTP_201_CREATED)



class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payment_method = request.data.get("payment_method")
        if payment_method not in ["stripe", "paypal", "credit_card"]:
            return Response({"error": "Invalid payment method."}, status=status.HTTP_400_BAD_REQUEST)

        orders = Order.objects.filter(
            customer=request.user, payment_complete=False)
        if not orders.exists():
            return Response({"error": "No unpaid orders found."}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = sum(order.total for order in orders)

        if payment_method == "stripe":
            token = request.data.get("stripe_token")
            if not token:
                return Response({"error": "Stripe token required."}, status=status.HTTP_400_BAD_REQUEST)
            try:
                charge = stripe.Charge.create(
                    amount=int(total_amount * 100),
                    currency="usd",
                    source=token,
                    description=f"Payment for Orders by {
                        request.user.username}",
                )
                payment = Payment.objects.create(
                    customer=request.user,
                    payment_method="stripe",
                    payment_id=charge.id,
                    amount_paid=total_amount,
                    status=True,
                )
                orders.update(payment=payment, payment_complete=True,
                              order_status="completed")
                return Response({"success": "Payment successful."}, status=status.HTTP_200_OK)
            except stripe.error.StripeError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        elif payment_method == "paypal":
            paypal_payment = paypalrestsdk.Payment({
                "intent": "sale",
                "payer": {"payment_method": "paypal"},
                "transactions": [{
                    "amount": {"total": f"{total_amount:.2f}", "currency": "USD"},
                    "description": "Payment for Orders",
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
                    amount_paid=total_amount,
                    status=True,
                )
                orders.update(payment=payment, payment_complete=True,
                              order_status="completed")
                return Response({"success": "PayPal payment initiated.", "redirect_url": paypal_payment["links"][1]["href"]}, status=status.HTTP_200_OK)
            return Response({"error": "PayPal payment failed."}, status=status.HTTP_400_BAD_REQUEST)

        elif payment_method == "credit_card":
            payment_id = "CREDIT_CARD_PAYMENT_ID"
            payment = Payment.objects.create(
                customer=request.user,
                payment_method="credit_card",
                payment_id=payment_id,
                amount_paid=total_amount,
                status=True,
            )
            orders.update(payment=payment, payment_complete=True,
                          order_status="completed")
            return Response({"success": "Credit card payment successful."}, status=status.HTTP_200_OK)

        return Response({"error": "Payment processing failed."}, status=status.HTTP_400_BAD_REQUEST)

