import React from 'react';
import "./Cart.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaCaretDown, FaCaretUp, FaCartArrowDown, FaHeart, FaPencilAlt, FaRandom, FaTrash } from "react-icons/fa";
import pr01 from "../../../../assets/images/shippingcart/pr-01.jpg";
import pr02 from "../../../../assets/images/shippingcart/pr-02.jpg";
import p11 from "../../../../assets/images/products/p-11.jpg";
import p12 from "../../../../assets/images/products/p-12.jpg";
import p13 from "../../../../assets/images/products/p-13.jpg";
import p14 from "../../../../assets/images/products/p-14.jpg";
import p15 from "../../../../assets/images/products/p-15.jpg";
import Singleprod from '../../components/Singleprod/Singleprod';

const cartdata = [
  {
    image: pr01,
    title: "National Fresh Fruit",
    price: "245",
    old_price: "600",
    quantity: "3",
    subtotal: "1250",
    total: "3000",
  },
  {
    image: pr02,
    title: "National Fresh Fruit",
    price: "245",
    old_price: "600",
    quantity: "3",
    subtotal: "1250",
    total: "3000",
  },
]

const data = [
  {
    photo_main: p11,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti ut officia quae cum iste tempora aliquid quidem perferendis quod!",
  },
  {
    photo_main: p12,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti ut officia quae cum iste tempora aliquid quidem perferendis quod!",
  },
  {
    photo_main: p13,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti ut officia quae cum iste tempora aliquid quidem perferendis quod!",
  },
  {
    photo_main: p14,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti ut officia quae cum iste tempora aliquid quidem perferendis quod!",
  },
  {
    photo_main: p15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti ut officia quae cum iste tempora aliquid quidem perferendis quod!",
  },
]

const Cart = () => {

  // const classes = useStyles();
  // const dispatch = useDispatch();
  // const orders = useSelector(state => state.profile.orders.orders);
  // const loading = useSelector(state => state.ui.loadingUI);

  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch]);

  // if (loading) {
  //   return null;
  // }

  // if (orders.length < 1) {
  //   return (
  //     <Typography className={classes.root} variant="h5">
  //       Your orders is empty
  //     </Typography>
  //   );
  // }


  return (
    <section>
      <div className="breadcrumb">
        <h1>Organic Fruits</h1>
      </div>
      <div className="cart-sec">
        <div className="container">
          <div className="boillife-nav d-flex">
            <a href="/" className="home-page">Home</a>
            <span>/</span>
            <a href="/cart" className="nav-item">Shopping Cart</a>
          </div>
        </div>

        <div className="shopping-cart-sec">
          <div className="container">

            <div className="shopping-cart-container">
              <div className="row">
                <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                  <h3 className="box-title">Your cart items</h3>
                  <form className="shopping-cart-form" action="#" method="post">
                    <table className="shop-table cart-form">
                      <thead>
                        <tr>
                          <th className="product-name">Product Name</th>
                          <th className="product-price">Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">Total</th>
                        </tr>
                      </thead>
                      <tbody>

                        {cartdata?.map((item, i) => (
                          <tr className="cart_item">
                            <td className="product-thumbnail" data-title="Product Name">
                              <a className="prd-thumb" href="#">
                                <figure><img height={113} width={113} src={item?.image} alt="shipping cart" /></figure>
                              </a>
                              <a className="prd-name" href="#">National Fresh Fruit</a>
                              <div className="action">
                                <a href="#" className="edit"><FaPencilAlt className='icon'/></a>
                                <a href="#" className="remove"><FaTrash className='icon' /></a>
                              </div>
                            </td>
                            <td className="product-price" data-title="Price">
                              <div className="price price-contain">
                                <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                                <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
                              </div>
                            </td>
                            <td className="product-quantity" data-title="Quantity">
                              <div className="quantity-box type1">
                                <div className="qty-input">
                                  <input type="text" name="qty12554" value={item?.quantity} data-max_value="20" data-min_value="1" data-step="1"/>
                                    <a href="#" className="qty-btn btn-up"><FaCaretUp className='icon' /></a>
                                    <a href="#" className="qty-btn btn-down"><FaCaretDown className='icon' /></a>
                                </div>
                              </div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              <div className="price price-contain">
                                <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.subtotal}</span></ins>
                                <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.total}</span></del>
                              </div>
                            </td>
                          </tr>
                        ))}

                        
                        <tr className="wrap-buttons">
                          <td className="wrap-btn-control d-flex" colspan="4">
                            <a className="btn-style">Back to Shop</a>
                            <div className="btn-left d-flex">
                              <button className="btn-outline-border btn-update" type="submit" disabled>update</button>
                              <button className="btn-outline-border btn-clear" type="reset">clear all</button>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </form>
                </div>

                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className="subtotal-block">
                    <div className="subtotal-line d-flex">
                      <b className="stt-name">Subtotal <span className="sub">(2ittems)</span></b>
                      <span className="stt-price">£170.00</span>
                    </div>
                    <div className="subtotal-line d-flex">
                      <b className="stt-name">Shipping</b>
                      <span className="stt-price">£0.00</span>
                    </div>
                    <div className="tax-fee">
                      <p className="title">Est. Taxes & Fees</p>
                      <p className="desc">Based on 56789</p>
                    </div>
                    <div className="btn-checkout text-center">
                      <a href="#" className="btn-style">Check out</a>
                    </div>
                    <div className="biolife-progress-bar">
                      <table>
                        <tr>
                          <td className="first-position">
                            <span className="index">$0</span>
                          </td>
                          <td className="mid-position">
                            <div className="progress">
                              <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </td>
                          <td className="last-position">
                            <span className="index">$99</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <p className="pickup-info"><b>Free Pickup</b> is available as soon as today More about shipping and pickup</p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="product-related-box">
              <div className="biolife-title-box text-center">
                <span className="biolife-icon"></span>
                <span className="subtitle">All the best item for You</span>
                <h3 className="main-title">Related Products</h3>
              </div>
              <ul className="products-list biolife-carousel d-flex" >

                {data?.map((item, i) => (
                  <li key={i} item className="product-item col-lg-3 col-md-6 col-sm-12">
                    <Singleprod product={item?.product} />
                  </li>
                ))}
                
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart