import React from 'react';
import "./Checkout.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import pr01 from "../../../../assets/images/shippingcart/pr-01.jpg";
import pr02 from "../../../../assets/images/shippingcart/pr-02.jpg";

const data = [
  {
    image: pr01,
    title: "National Fresh Fruit",
    price: "85",
    old_price: "135",
  },
  {
    image: pr02,
    title: "National Fresh Fruit",
    price: "85",
    old_price: "135",
  },
]

const Checkout = () => {
  return (
    <section>
      <div className="breadcrumb">
        <h1>Organic Fruits</h1>
      </div>
      <div className="checkout-sec">
        <div className="container">
          <div className="boillife-nav d-flex">
            <a href="/" className="home-page">Home</a>
            <span>/</span>
            <a href="/checkout" className="nav-item">Shoppingcart</a>
          </div>
        </div>

        <div className="checkout-sec">
          <div className="container">
            <div className="row">

              <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                <div className="checkout-progress">
                  <ul className="steps">
                    <li className="step-1st">
                      <div className="checkout-act active">
                        <h3 className="title-box"><span className="number">1</span>Customer</h3>
                        <div className="box-content">
                          <p className="txt-desc">Checking out as a <a className="pmlink" href="#">Guest?</a> You’ll be able to save your details to create an account with us later.</p>
                          <div className="login-checkout">
                            <form action="#" name="frm-login" method="post">
                              <p className="form-row-one">
                                <label for="input_email">Email Address</label><br />
                                <input type="email" name="email" id="input_email" value="" placeholder="Your email" />
                                <button type="submit" name="btn-sbmt" className="btn-style">Continue As Guest</button>
                              </p>
                              <p className="form-row-two">
                                <input type="checkbox" name="subcribe" id="input_subcribe" />
                                <label for="input_subcribe">Subscribe to our newsletter</label>
                              </p>
                              <p className="msg">Already have an account? <a href="#" className="link-forward">Sign in now</a></p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="step-2nd">
                      <div className="checkout-act"><h3 className="title-box"><span className="number">2</span>Shipping</h3></div>
                    </li>
                    <li className="step-3rd">
                      <div className="checkout-act"><h3 className="title-box"><span className="number">3</span>Billing</h3></div>
                    </li>
                    <li className="step-4th">
                      <div className="checkout-act"><h3 className="title-box"><span className="number">4</span>Payment</h3></div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                <div className="order-summary">
                  <div className="title-block d-flex">
                    <h3 className="title">Order Summary</h3>
                    <a href="#" className="link-forward">Edit cart</a>
                  </div>
                  <div className="cart-list-box short-type">
                    <span className="number">2 items</span>
                    <ul className="cart-list">

                      {data?.map((item, i) => (
                        <li className="cart-elem">
                          <div className="cart-item d-flex">
                            <div className="product-thumb">
                              <a className="prd-thumb" href="#">
                                <figure><img src={item?.image} width={113} height={113} alt="shop-cart" /></figure>
                              </a>
                            </div>
                            <div className="info">
                              <span className="txt-quantity">{item?.quantity}</span><br />
                              <a href="#" className="pr-name">{item?.title}</a>
                            </div>
                            <div className="price-contain">
                              <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                              <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
                            </div>
                          </div>
                        </li>
                      ))}


                    </ul>
                    <ul className="subtotal">
                      <li>
                        <div className="subtotal-line d-flex">
                          <b className="stt-name">Subtotal</b>
                          <span className="stt-price">£170.00</span>
                        </div>
                      </li>
                      <li>
                        <div className="subtotal-line d-flex">
                          <b className="stt-name">Shipping</b>
                          <span className="stt-price">£20.00</span>
                        </div>
                      </li>
                      <li>
                        <div className="subtotal-line d-flex">
                          <b className="stt-name">Tax</b>
                          <span className="stt-price">£0.00</span>
                        </div>
                      </li>
                      <li>
                        <div className="subtotal-line d-flex">
                          <a href="#" className="link-forward">Promo/Gift Certificate</a>
                        </div>
                      </li>
                    </ul>
                      <div className="total-price d-flex">
                        <b className="stt-name">total:</b>
                        <span className="stt-price">£190.00</span>
                      </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout