import React from 'react';
import pr01 from '/assets/images/shippingcart/pr-01.jpg';
import pr02 from '/assets/images/shippingcart/pr-02.jpg';

const data = [
  {
    image: pr01,
    title: 'National Fresh Fruit',
    price: '85',
    old_price: '135',
  },
  {
    image: pr02,
    title: 'National Fresh Fruit',
    price: '85',
    old_price: '135',
  },
];

const Checkout = () => {
  return (
    <section className="p-8">
      <div className="breadcrumb mb-6">
        <h1 className="text-2xl font-semibold">Organic Fruits</h1>
      </div>
      <div className="checkout-sec">
        <div className="container">
          <nav className="flex mb-4">
            <a href="/" className="text-blue-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/checkout" className="text-blue-600">Shoppingcart</a>
          </nav>

          <div className="flex">
            {/* Customer Info Section */}
            <div className="w-2/3 pr-4">
              <div className="checkout-progress p-6 bg-gray-100 rounded-lg">
                <ul className="steps">
                  <li className="step step-active">
                    <div className="checkout-act">
                      <h3 className="title-box text-lg font-bold">
                        <span className="inline-block w-8 h-8 bg-blue-600 text-white text-center rounded-full mr-2">1</span>
                        Customer
                      </h3>
                      <div className="box-content mt-4">
                        <p className="txt-desc text-gray-700">
                          Checking out as a <a className="text-blue-500" href="#">Guest?</a> You’ll be able to save your details to create an account with us later.
                        </p>
                        <div className="login-checkout mt-4">
                          <form>
                            <div className="mb-4">
                              <label htmlFor="input_email" className="block font-bold">Email Address</label>
                              <input type="email" name="email" id="input_email" placeholder="Your email" className="mt-2 p-2 border border-gray-300 rounded w-full" />
                              <button type="submit" className="mt-4 btn btn-blue">Continue As Guest</button>
                            </div>
                            <div className="flex items-center mb-4">
                              <input type="checkbox" name="subscribe" id="input_subscribe" className="mr-2" />
                              <label htmlFor="input_subscribe" className="text-gray-700">Subscribe to our newsletter</label>
                            </div>
                            <p className="msg text-gray-600">Already have an account? <a href="#" className="text-blue-500">Sign in now</a></p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="step">
                    <div className="checkout-act">
                      <h3 className="title-box text-lg font-bold">
                        <span className="inline-block w-8 h-8 bg-blue-600 text-white text-center rounded-full mr-2">2</span>
                        Shipping
                      </h3>
                    </div>
                  </li>
                  <li className="step">
                    <div className="checkout-act">
                      <h3 className="title-box text-lg font-bold">
                        <span className="inline-block w-8 h-8 bg-blue-600 text-white text-center rounded-full mr-2">3</span>
                        Billing
                      </h3>
                    </div>
                  </li>
                  <li className="step">
                    <div className="checkout-act">
                      <h3 className="title-box text-lg font-bold">
                        <span className="inline-block w-8 h-8 bg-blue-600 text-white text-center rounded-full mr-2">4</span>
                        Payment
                      </h3>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-1/3 pl-4">
              <div className="order-summary bg-white p-6 rounded-lg shadow">
                <div className="title-block flex justify-between items-center mb-4">
                  <h3 className="title text-lg font-bold">Order Summary</h3>
                  <a href="#" className="text-blue-500">Edit cart</a>
                </div>
                <div className="cart-list-box">
                  <span className="number text-gray-700">2 items</span>
                  <ul className="cart-list list-none my-4">
                    {data.map((item, i) => (
                      <li className="cart-elem flex justify-between items-center mb-4" key={i}>
                        <div className="cart-item flex items-center">
                          <div className="product-thumb mr-4">
                            <a className="prd-thumb" href="#">
                              <img src={item.image} width={60} height={60} alt="shop-cart" className="rounded" />
                            </a>
                          </div>
                          <div className="info">
                            <span className="txt-quantity text-gray-600">1</span><br />
                            <a href="#" className="pr-name text-gray-800 font-semibold">{item.title}</a>
                          </div>
                        </div>
                        <div className="price-contain text-right">
                          <ins className="font-bold text-lg"><span className="currencySymbol">£</span>{item.price}</ins>
                          <del className="text-gray-600"><span className="currencySymbol">£</span>{item.old_price}</del>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <ul className="subtotal list-none border-t pt-4">
                    <li className="flex justify-between">
                      <b className="stt-name">Subtotal</b>
                      <span className="stt-price">£170.00</span>
                    </li>
                    <li className="flex justify-between">
                      <b className="stt-name">Shipping</b>
                      <span className="stt-price">£20.00</span>
                    </li>
                    <li className="flex justify-between">
                      <b className="stt-name">Tax</b>
                      <span className="stt-price">£0.00</span>
                    </li>
                    <li>
                      <a href="#" className="text-blue-500 hover:underline">Promo/Gift Certificate</a>
                    </li>
                  </ul>
                  <div className="total-price flex justify-between mt-4 font-bold">
                    <span className="stt-name">Total:</span>
                    <span className="stt-price">£190.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
