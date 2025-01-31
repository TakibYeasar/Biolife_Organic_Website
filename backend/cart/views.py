from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from products.models import Product
from .models import Cart, CartProduct
from .serializers import CartSerializer


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        try:
            product = Product.objects.get(pk=product_id)
            user = request.user
            incomplete_cart, _ = Cart.objects.get_or_create(
                customer=user, complete=False)
            cart_product = incomplete_cart.cart_products.filter(
                product=product).first()

            if cart_product:
                cart_product.quantity += 1
                cart_product.subtotal = cart_product.calculate_subtotal()
                cart_product.save()

                incomplete_cart.total += product.price
                incomplete_cart.save()
            else:
                CartProduct.objects.create(
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
            return Response(
                {'error': True, 'message': "Something went wrong",
                    'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MyCart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart = Cart.objects.get(customer=request.user,complete=False)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response({'error': 'No active cart found.'}, status=status.HTTP_404_NOT_FOUND)


class IncreaseCartProdQuantity(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        try:
            cart_product = CartProduct.objects.get(
                pk=product_id, cart__customer=request.user)

            cart_product.quantity += 1
            cart_product.subtotal = cart_product.calculate_subtotal()
            cart_product.save()

            cart_product.cart.total += cart_product.product.price
            cart_product.cart.save()

            return Response({'message': 'Cart product quantity increased.'}, status=status.HTTP_200_OK)

        except CartProduct.DoesNotExist:
            return Response({'error': 'Cart product not found.'}, status=status.HTTP_404_NOT_FOUND)


class DecreaseCartProdQuantity(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        try:
            cart_product = CartProduct.objects.get(
                pk=product_id, cart__customer=request.user)

            if cart_product.quantity > 1:
                cart_product.quantity -= 1
                cart_product.subtotal = cart_product.calculate_subtotal()
                cart_product.save()

                cart_product.cart.total -= cart_product.product.price
                cart_product.cart.save()

                return Response({'message': 'Cart product quantity decreased.'}, status=status.HTTP_200_OK)
            else:
                cart_product.delete()
                return Response({'message': 'Cart product removed.'}, status=status.HTTP_200_OK)

        except CartProduct.DoesNotExist:
            return Response({'error': 'Cart product not found.'}, status=status.HTTP_404_NOT_FOUND)


class DeleteCartProduct(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        try:
            cart_product = CartProduct.objects.get(
                pk=product_id, cart__customer=request.user)
            cart_product.delete()
            return Response({"message": "Cart product deleted."}, status=status.HTTP_204_NO_CONTENT)
        except CartProduct.DoesNotExist:
            raise NotFound("Cart product not found.")


class DeleteFullCart(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            cart = Cart.objects.get(customer=request.user, complete=False)
            cart.delete()
            return Response({"message": "Cart deleted."}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            raise NotFound("Cart not found.")


