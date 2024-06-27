from .models import *
from .serializers import *
from rest_framework import status, views, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response, JsonResponse
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.conf import settings
import stripe
import paypalrestsdk


class AddToCartView(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        product_id = request.data.get('id')

        try:
            product = Product.objects.get(pk=product_id)
            user = request.user
            incomplete_cart, _ = Cart.objects.get_or_create(customer=user, complete=False)
            cart_product = incomplete_cart.cartproduct_set.filter(product=product).first()

            if cart_product:
                cart_product.quantity += 1
                cart_product.subtotal = cart_product.quantity * product.price
                cart_product.save()

                incomplete_cart.total += product.price
                incomplete_cart.save()
            else:
                new_cart_product = CartProduct.objects.create(
                    cart=incomplete_cart,
                    product=product,
                    quantity=1,
                    subtotal=product.price
                )

                incomplete_cart.total += product.price
                incomplete_cart.save()

            return Response(
                {'error': False, 'message': "Product added to Cart",
                    "productid": product_id},
                status=status.HTTP_201_CREATED
            )

        except Product.DoesNotExist:
            return Response(
                {'error': True, 'message': "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            print(e)
            return Response(
                {'error': True, 'message': "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MyCart(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        cart = Cart.objects.filter(customer=request.user).first()

        if cart:
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        else:
            return Response({'error': 'No cart found.'}, status=status.HTTP_404_NOT_FOUND)


class IncreaseCartProdQuantity(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        try:
            cart_product_id = request.data.get('id')
            cart_product = CartProduct.objects.get(
                pk=cart_product_id, customer=request.user)

            cart_product.quantity += 1
            cart_product.subtotal += cart_product.price
            cart_product.save()

            cart_product.cart.total += cart_product.price
            cart_product.cart.save()

            return Response({'message': 'Cart product quantity increased.'}, status=status.HTTP_200_OK)

        except CartProduct.DoesNotExist:
            return Response({'error': 'Cart product not found.'}, status=status.HTTP_404_NOT_FOUND)


class DecreaseCartProdQuantity(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        try:
            cart_product_id = request.data.get('id')
            cart_product = CartProduct.objects.get(
                pk=cart_product_id, customer=request.user)

            if cart_product.quantity > 1:
                cart_product.quantity -= 1
                cart_product.subtotal -= cart_product.price
                cart_product.save()

                cart_product.cart.total -= cart_product.price
                cart_product.cart.save()

                return Response({'message': 'Cart product quantity decreased.'}, status=status.HTTP_200_OK)
            else:
                cart_product.delete()
                return Response({'message': 'Cart product removed.'}, status=status.HTTP_200_OK)

        except CartProduct.DoesNotExist:
            return Response({'error': 'Cart product not found.'}, status=status.HTTP_404_NOT_FOUND)


class DeleteCartProduct(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def delete(self, request, pk):
        try:
            cart_product = CartProduct.objects.get(
                pk=pk, customer=request.user)
            cart_product.delete()
            return Response({"message": "Cart product deleted."}, status=status.HTTP_204_NO_CONTENT)
        except CartProduct.DoesNotExist:
            raise NotFound("Cart product not found.")

class DeleteFullCart(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def delete(self, request):
        try:
            cart = Cart.objects.get(customer=request.user)
            cart.delete()
            return Response({"message": "Cart deleted."}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            raise NotFound("Cart not found.")

class AddAddressAPIView(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        order = Order.objects.filter(
            buyer=request.user, in_processing=False).first()
        if not order:
            return Response({'error': 'No order found for this user'}, status=status.HTTP_400_BAD_REQUEST)

        if request.data.get('use_default', False):
            address = Address.objects.filter(
                customer=request.user, is_default=True).first()
            if address:
                order.address = address
                order.save()
                return Response({'success': 'User is using the default address'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User has no default address'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AddAdressSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        address = serializer.save(buyer=request.user)

        if request.data.get('is_default', False):
            Address.objects.filter(customer=request.user,
                                   is_default=True).update(is_default=False)
            address.is_default = True
            address.save()

        order.address = address
        order.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(cart__customer=self.request.user)

    def retrieve(self, request, pk=None):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Order.DoesNotExist:
            raise NotFound("Order not found.")

    def destroy(self, request, pk=None):
        try:
            instance = self.get_object()
            cart = instance.cart
            instance.delete()
            cart.delete()
            return Response({"error": False, "message": "Order deleted", "order_id": pk}, status=status.HTTP_204_NO_CONTENT)
        except Order.DoesNotExist:
            raise NotFound("Order not found.")

    def create(self, request):
        cart_id = request.data["cartId"]
        cart = Cart.objects.get(id=cart_id)
        address = request.data["address"]
        cart.complete = True
        cart.save()
        order = Order.objects.create(
            cart=cart,
            address=address,
            total=cart.total,
            discount=3,
            customer=request.user
        )
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order = Order.objects.get(user=request.user, ordered=False)
        if order.address:
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        else:
            return Response({"error": "No billing address added"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            order = Order.objects.get(user=request.user, ordered=False)

            # Get payment method from request and validate
            payment_method = request.data.get('payment_method')
            if not payment_method:
                return Response({"error": "Missing payment method"}, status=status.HTTP_400_BAD_REQUEST)
            if payment_method not in ['stripe', 'paypal']:
                return Response({"error": "Invalid payment method"}, status=status.HTTP_400_BAD_REQUEST)

            # Process payment based on chosen method
            if payment_method == 'stripe':
                token = request.data.get('stripeToken')
                amount = int(order.get_total() * 100)
                charge = stripe.Charge.create(
                    amount=amount,
                    currency="usd",
                    source=token
                )

                payment = Payment.objects.create(
                    stripe_charge_id=charge['id'],
                    user=request.user,
                    amount=order.get_total()
                )

            elif payment_method == 'paypal':
                paypalrestsdk.configure({
                    "mode": settings.PAYPAL_MODE,
                    "client_id": settings.PAYPAL_CLIENT_ID,
                    "client_secret": settings.PAYPAL_CLIENT_SECRET,
                })

                paypal_payment = paypalrestsdk.Payment({
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal",
                    },
                    "transactions": [
                        {
                            "amount": {
                                "total": str(order.get_total()),
                                "currency": "USD",  # Adjust as needed
                            },
                            "description": "Payment for Order #{}".format(order.id),
                        }
                    ],
                    "redirect_urls": {
                        "return_url": "YOUR_RETURN_URL",
                        "cancel_url": "YOUR_CANCEL_URL",
                    },
                })

                if paypal_payment.create():
                    payment = Payment.objects.create(
                        paypal_payment_id=paypal_payment.id,
                        user=request.user,
                        amount=order.get_total()
                    )
                    # Redirect to PayPal for approval (handle in frontend)
                    approval_url = next(
                        link.href for link in paypal_payment.links if link.rel == "approval_url")
                    return JsonResponse({"approval_url": approval_url}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": "Failed to create PayPal payment"}, status=status.HTTP_400_BAD_REQUEST)

            # Complete order processing
            order.ordered = True
            order.payment = payment
            order.save()

            return Response({"message": "Order successful"}, status=status.HTTP_201_CREATED)

        except stripe.error.StripeError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Log the error for debugging
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PaymentSuccessfullView(APIView):
    pass
class PaymentFailedView(APIView):
    pass

