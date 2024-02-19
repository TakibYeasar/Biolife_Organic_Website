from rest_framework.response import Response
from rest_framework import views, status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import stripe
stripe.api_key = "sk_test_1srueIi8nRsob787g1O3pS0z00NR4rSjbb"

# Create your views here.

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        incomplete_cart = Cart.objects.filter(
            customer=request.user.profile).filter(complete=False).first()

        try:
            if incomplete_cart:
                this_product_in_cart = incomplete_cart.cartproduct_set.filter(
                    product=product_obj)
                if this_product_in_cart.exists():
                    cart_product = CartProduct.objects.filter(
                        product=product_obj).filter(cart__complete=False).first()
                    cart_product.quantity += 1
                    cart_product.subtotal += product_obj.price
                    cart_product.save()
                    incomplete_cart.total += product_obj.price
                    incomplete_cart.save()
                else:
                    new_cart_product = CartProduct.objects.create(
                        cart=incomplete_cart,
                        price=product_obj.price,
                        quantity=1,
                        subtotal=product_obj.price
                    )
                    new_cart_product.product.add(product_obj)
                    incomplete_cart.total += product_obj.price
                    incomplete_cart.save()
            else:
                Cart.objects.create(
                    customer=request.user.profile, total=0, complete=False)
                new_cart = Cart.objects.filter(
                    customer=request.user.profile).filter(complete=False).first()
                new_cart_product = CartProduct.objects.create(
                    cart=new_cart,
                    price=product_obj.price,
                    quantity=1,
                    subtotal=product_obj.price
                )
                new_cart_product.product.add(product_obj)
                new_cart.total += product_obj.price
                new_cart.save()

            message = {
                'error': False, 'message': "Product added to Cart", "productid": product_id}

        except Exception as e:
            print(e)
            message = {
                'error': True, 'message': "Product Not added to Cart! Something went Wrong"}

        return Response(message)


class MyCart(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query, many=True)
        all_data = []
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(
                cart_product, many=True)
            cart["cart_product"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)


class IncreaseCartProdQuantity(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity += 1
        cp_obj.subtotal += cp_obj.price
        cp_obj.save()

        cart_obj.total += cp_obj.price
        cart_obj.save()
        return Response({"message": "CartProduct Add Update", "product": request.data['id']})


class DecreaseCartProdQuantity(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity -= 1
        cp_obj.subtotal -= cp_obj.price
        cp_obj.save()

        cart_obj.total -= cp_obj.price
        cart_obj.save()
        if cp_obj.quantity == 0:
            cp_obj.delete()
        return Response({"message": "CartProduct Add Update", "product": request.data['id']})


class DeleteCartProduct(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cp_obj.delete()
        return Response({"message": "CartProduct Deleted", "product": request.data['id']})


class DeleteFullCart(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            card_obj = Cart.objects.get(id=request.data['id'])
            card_obj.delete()
            message = {"message": "Cart Deleted"}
        except Exception as e:
            print(e)
            message = {"message": "Something went wrong"}
        return Response(message)


class AddAddressAPIView(APIView):
    serializer_class = AddAdressSerializer()

    def post(self, request):
        order_qs = Order.objects.filter(buyer=request.user.profile, in_processing=False)

        if not order_qs.exists():
            return Response({'error:': 'No order found for this user'}, status=status.HTTP_400_BAD_REQUEST)

        order = order_qs.first()

        if request.data.get('use_default', False):
            address_qs = Address.objects.filter(
                customer=request.user.profile, is_default=True)
            if address_qs.exists():
                address = address_qs.first()
                order.address = address
                order.save()
                return Response({'success:': 'User is using the default address'}, status=status.HTTP_200_OK)
            else:
                return Response({'error:': 'User has no default address'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        address = serializer.save()
        address.buyer = request.user.profile
        address.save()

        if request.data.get('is_default', False):
            previous_default = Address.objects.filter(
                customer=request.user.profile, is_default=True).first()
            if previous_default:
                previous_default.is_default = False
                previous_default.save()
            address.is_default = True
            address.save()

        order.address = address
        order.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderViewSet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Order.objects.filter(cart__customer=request.user.profile)
        serializer = OrderSerializer(queryset, many=True)
        data = serializer.data
        for order in data:
            cart_products = CartProduct.objects.filter(
                cart_id=order['cart']['id'])
            cart_product_serializer = CartProductSerializer(
                cart_products, many=True)
            order['cart_product'] = cart_product_serializer.data
        return Response(data)

    def retrieve(self, request, pk=None):
        try:
            order = Order.objects.get(id=pk)
            serializer = OrderSerializer(order)
            data = serializer.data
            cart_products = CartProduct.objects.filter(
                cart_id=data['cart']['id'])
            cart_product_serializer = CartProductSerializer(
                cart_products, many=True)
            data['cart_product'] = cart_product_serializer.data
            return Response({"error": False, "data": data})
        except Order.DoesNotExist:
            return Response({"error": True, "data": "No data found for this ID"})

    def destroy(self, request, pk=None):
        try:
            order = Order.objects.get(id=pk)
            cart = Cart.objects.get(id=order.cart.id)
            order.delete()
            cart.delete()
            return Response({"error": False, "message": "Order deleted", "order_id": pk})
        except Order.DoesNotExist:
            return Response({"error": True, "message": "Order not found"})

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
        )
        return Response({"message": "Order completed", "cart_id": cart_id, "order_id": order.id})


class PaymentAPIView(APIView):
    serializer_class = PaymentSerializer

    def post(self, request):
        token = request.data.get('public_key')
        payment_method_id = request.data.get('payment_method_id')

        try:
            order = Order.objects.get(
                customer=request.user.profile, in_processing=False)
            amount = int(order.get_order_total() * 100)

            # Check if this customer already exists in Stripe
            customer_data = stripe.Customer.list(
                email=request.user.profile.email).data
            if not customer_data:
                # Create a new customer if not exists
                customer = stripe.Customer.create(
                    email=request.user.profile.email,
                    payment_method=payment_method_id
                )
            else:
                customer = customer_data[0]

            # Charge the customer
            charge = stripe.PaymentIntent.create(
                customer=customer,
                payment_method=payment_method_id,
                currency='usd',
                amount=amount,
                confirm=True
            )

            # Save payment details
            payment = Payment.objects.create(
                stripe_charge_id=charge['id'],
                amount=order.get_order_total()
            )

            # Mark ordered items as ordered
            ordered_items = order.products.all()
            for item in ordered_items:
                item.ordered = True
                item.save()

            # Update order details
            order.payment = payment
            order.in_processing = True
            order.save()

            return Response({'success:': 'Payment successful'}, status=status.HTTP_200_OK)

        except stripe.error.CardError as e:
            return Response({'error:': 'Card error. Please try again later'}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            return Response({'error:': 'Rate limit error. Please try again later'}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            return Response({'error:': 'Invalid parameters. Please try again later'}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            return Response({'error:': 'Authentication error. Please try again later'}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            return Response({'error:': 'Network error. Please try again later'}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            return Response({'error:': 'Payment error. Please try again later'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error:': 'Something went wrong. Please try again later'}, status=status.HTTP_400_BAD_REQUEST)
