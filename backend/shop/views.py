from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth.decorators import login_required
import stripe
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import views
from .serializers import *


class MyCart(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query, many=True)
        all_data = []
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(cart_product, many=True)
            cart["cart_product"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)



class AddToCartView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        incomplete_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()

        try:
            if incomplete_cart:
                this_product_in_cart = incomplete_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    cart_product = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
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
                Cart.objects.create(customer=request.user, total=0, complete=False)
                new_cart = Cart.objects.filter(customer=request.user).filter(complete=False).first()
                new_cart_product = CartProduct.objects.create(
                    cart=new_cart,
                    price=product_obj.price,
                    quantity=1,
                    subtotal=product_obj.price
                )
                new_cart_product.product.add(product_obj)
                new_cart.total += product_obj.price
                new_cart.save()

            message = {'error': False, 'message': "Product added to Cart", "productid": product_id}

        except Exception as e:
            print(e)
            message = {'error': True, 'message': "Product Not added to Cart! Something went Wrong"}

        return Response(message)


class UpdateCartProduct(views.APIView):
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


class EditCartProduct(views.APIView):
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




class DeleteCartProduct(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cp_obj.delete()
        return Response({"message": "CartProduct Deleted", "product": request.data['id']})


class DeleteFullCart(views.APIView):
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
    
    
class OrderViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request):
        query = Order.objects.filter(cart__customer=request.user.profile)
        serializers = OrderSerializer(query, many=True)
        all_data = []
        for order in serializers.data:
            cart_product = CartProduct.objects.filter(cart_id=order['cart']['id'])
            cart_product_serializer = CartProductSerializer(cart_product, many=True)
            order['cart_product'] = cart_product_serializer.data
            all_data.append(order)
        return Response(all_data)

    def retrieve(self, request, pk=None):
        try:
            queryset = Order.objects.get(id=pk)
            serializers = OrderSerializer(queryset)
            data = serializers.data
            all_data = []
            cart_product_obj = CartProduct.objects.filter(cart_id=data['cart']['id'])
            cart_product_serializer = CartProductSerializer(cart_product_obj, many=True)
            data['cart_product'] = cart_product_serializer.data
            all_data.append(data)
            message = {"error": False, "data": all_data}
        except Exception as e:
            print(e)
            message = {"error": True, "data": "No data Found for This id"}

        return Response(message)

    def destroy(self, request, pk=None):
        try:
            order_obj = Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            message = {"error": False, "message": "Order deleted", "order id": pk}
        except Exception as e:
            print(e)
            message = {"error": True, "message": "Order Not Found"}
        return Response(message)

    def create(self, request):
        print(request.data)
        cart_id = request.data["cartId"]
        cart_obj = Cart.objects.get(id=cart_id)
        address = request.data["address"]
        mobile = request.data["mobile"]
        email = request.data["email"]
        cart_obj.complete = True
        cart_obj.save()
        created_order = Order.objects.create(
            cart=cart_obj,
            address=address,
            mobile=mobile,
            email=email,
            total=cart_obj.total,
            discount=3,
        )

        return Response({"message": "Order Completed", "cart id": cart_id, "order id": created_order.id})


# class CheckoutView(LoginRequiredMixin, View):
#     def get(self, *args, **kwargs):
#         try :
#             order = Order.objects.get(user=self.request.user, ordered=False)
#             if order.items.count() == 0:
#                 messages.info(self.request, "You don't have items in your cart")
#                 return redirect("core:home")

#             form = CheckoutForm()
#             context = {
#                 'form' : form,
#                 'order': order,
#                 'couponform' : CouponForm(),
#                 'display_coupon_form' : True
#             }

#             shipping_address_qs = Address.objects.filter(
#                 user=self.request.user,
#                 default=True,
#                 address_type= 'S'
#             )

#             if shipping_address_qs.exists():
#                 context.update(
#                    { 'default_shipping_address': shipping_address_qs[0] }
#                 )

#             billing_address_qs = Address.objects.filter(
#                 user=self.request.user,
#                 default=True,
#                 address_type= 'B'
#             )

#             if billing_address_qs.exists():
#                 context.update(
#                    { 'default_billing_address' : billing_address_qs[0] }
#                 )
#             return render(self.request, "checkout-page.html", context)


#         except ObjectDoesNotExist:
#             messages.warning(self.request, "You don't have an active order")
#             return redirect("core:home")


#     def post(self, *args, **kwargs):
#         form = CheckoutForm(self.request.POST or None)
#         try:
#             order = Order.objects.get(user=self.request.user, ordered=False)
#             if form.is_valid():

#                 use_default_shipping = form.cleaned_data.get(
#                     'use_default_shipping'
#                 )

#                 if use_default_shipping:
#                     print("using the default shipping address")
#                     address_qs = Address.objects.filter(
#                         user = self.request.user,
#                         default=True,
#                         address_type = 'S',
#                     )
#                     if address_qs.exists():
#                         shipping_address = address_qs[0]
#                         order.shipping_address = shipping_address
#                         order.save()
#                     else:
#                         messages.info(self.request, "You do not have a default shipping address")
#                         return redirect('core:checkout')

#                 else:
#                     print('User is entring new shipping address')
#                     shipping_address1 = form.cleaned_data.get('shipping_address')
#                     shipping_address2 = form.cleaned_data.get('shipping_address2')
#                     shipping_country = form.cleaned_data.get('shipping_country')
#                     shipping_zip = form.cleaned_data.get('shipping_zip')

#                     if is_valid_form([shipping_address1, shipping_country, shipping_zip]):
#                         shipping_address = Address.objects.create(
#                             user= self.request.user,
#                             street_address=shipping_address1,
#                             apartment_address= shipping_address2,
#                             country= shipping_country,
#                             zip=shipping_zip,
#                             address_type='S'       
#                         )

#                         order.shipping_address = shipping_address
#                         order.save()

#                         set_default_shipping = form.cleaned_data.get(
#                             'set_default_shipping'
#                         )
#                         if set_default_shipping:
#                             shipping_address.default = True
#                             shipping_address.save()

#                     else:
#                         messages.info(self.request, "Please fill in the required shipping address fields")


#                 use_default_billing = form.cleaned_data.get(
#                     'use_default_billing'
#                 )
#                 use_same_billing = form.cleaned_data.get(
#                     'same_billing_address'
#                 )

#                 if use_same_billing:
#                     print("Using same billing address as shipping address")
#                     billing_address = shipping_address
#                     billing_address.address_type = 'B'
#                     billing_address.pk = None
#                     billing_address.save()
#                     order.billing_address = billing_address
#                     order.save()
                
#                 elif use_default_billing:
#                     print("Using same default billing address")
#                     address_qs = Address.objects.filter(
#                         user=self.request.user,
#                         address_type='B',
#                         default=True
#                     )
#                     if address_qs.exists():
#                         billing_address = address_qs[0]
#                         order.billing_address = billing_address
#                         order.save()
#                     else:
#                         messages.info(self.request, "You don't have a default billing address")
#                         return redirect("core:checkout")

#                 else:
#                     print("User entering new billing address")
#                     billing_address1 = form.cleaned_data.get('billing_address')
#                     billing_address2 = form.cleaned_data.get('billing_address2')
#                     billing_country = form.cleaned_data.get('billing_country')
#                     billing_zip = form.cleaned_data.get('billing_zip')

#                     if is_valid_form([billing_address1, billing_country, billing_zip]):
#                         billing_address = Address(
#                             user=self.request.user,
#                             street_address=billing_address1,
#                             apartment_address=billing_address2,
#                             country= billing_country,
#                             zip = billing_zip,
#                             address_type = 'B'
#                         )

#                         billing_address.save()
#                         order.billing_address= billing_address
#                         order.save()

#                         set_default_billing = form.cleaned_data.get('set_default_billing')
#                         if set_default_billing:
#                             billing_address.default = True
#                             billing_address.save()
                    
#                     else:
#                         messages.info(self.request, "Please fill in the required billing address fields")
                
#                 payment_option = form.cleaned_data.get('payment_option')
#                 if payment_option == 'S':
#                     messages.info(self.request, "You selected stripe as payment option")
#                     return redirect('core:payment', payment_option='stripe')
                
#                 elif payment_option == 'P':
#                     return redirect('core:payment', payment_option='paypal')
#                 else:
#                     messages.warning(
#                         self.request, "Invalid payment option selected")
#                     return redirect('core:checkout')
#             else:
#                 messages.info(self.request, "Form is not valid")
#                 return redirect("core:checkout")

#         except ObjectDoesNotExist:
#             messages.warning(self.request, "You do not have an active order")
#             return redirect("core:order-summary")


class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=request.user , ordered=False)
        userprofile = request.user.userprofile
        billing_address_id = request.data.get('billing_address')
        shipping_address_id = request.data.get('shipping_address')
        stripetoken = request.data.get('stripeToken')

        billing_address = Address.objects.get(id= billing_address_id)
        shipping_address = Address.objects.get(id = shipping_address_id)


        if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
            customer = stripe.Customer.retrieve(
                    userprofile.stripe_customer_id
                )

            customer.sources.create(source=stripetoken)

        else:
            customer = stripe.Customer.create(
            email = self.request.user.email
            )

            customer.sources.create(source= stripetoken)
            userprofile.stripe_customer_id = customer['id']
            userprofile.one_click_purchasing = True
            userprofile.save()
                
        amount = int(order.get_total_price())

        try:
            # charge the customer because we cannot charge the token more than once
            charge = stripe.PaymentIntent.create(
                    amount = amount,
                    currency = "usd",
                    description = "Payment",
                    customer= userprofile.stripe_customer_id
            )
                                        
            # create payment
            payment = Payment.objects.create(
            user= self.request.user,
            amount= amount, 
            stripe_charge_id=charge['id']
            )
            payment.save()

            #assign the payment to order
            order_items = order.items.all()
            order_items.update(ordered=True)
            for item in order_items:
                item.save()

            order.ordered = True
            order.payment= payment
            order.shipping_address = shipping_address
            order.billing_address = billing_address
            # order.ref_code = create_ref_code()
            order.save()

            return Response({"message" :"Your order was successful!"}, status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message" : f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
           return Response({"message" : f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            print(e)
            return Response({"message" : f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message" : f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
           return Response({"message" : f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message" : f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            print(e)
            return Response({"message" : f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        return Response({"message":"Invalid data received"}, status=HTTP_400_BAD_REQUEST)




        
        
        
        
        