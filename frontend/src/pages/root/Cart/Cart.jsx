import React from 'react';
import { FaCaretDown, FaCaretUp, FaPencilAlt, FaTrash } from "react-icons/fa";
import pr01 from "/assets/images/shippingcart/pr-01.jpg";
import pr02 from "/assets/images/shippingcart/pr-02.jpg";
import p11 from "/assets/images/products/p-11.jpg";
import p12 from "/assets/images/products/p-12.jpg";
import p13 from "/assets/images/products/p-13.jpg";
import p14 from "/assets/images/products/p-14.jpg";
import p15 from "/assets/images/products/p-15.jpg";
import {ProductCard} from '../../../components';

const cartdata = [
  {
    image: pr01,
    title: "National Fresh Fruit",
    price: "245",
    old_price: "600",
    quantity: "3",
    subtotal: "1250",
  },
  {
    image: pr02,
    title: "National Fresh Fruit",
    price: "245",
    old_price: "600",
    quantity: "3",
    subtotal: "1250",
  },
];

const data = [
  {
    photo_main: p11,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
  },
  {
    photo_main: p12,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
  },
  {
    photo_main: p13,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
  },
  {
    photo_main: p14,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
  },
  {
    photo_main: p15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "450",
    old_price: "900",
  },
];

const Cart = () => {
  return (
    <section>
      <div className="bg-gray-100 py-8">
        <h1 className="text-center text-3xl font-bold">Organic Fruits</h1>
      </div>
      <div className="container mx-auto py-6">
        <nav className="flex mb-4">
          <a href="/" className="text-blue-500 hover:underline">Home</a>
          <span className="mx-2">/</span>
          <a href="/cart" className="text-blue-500 hover:underline">Shopping Cart</a>
        </nav>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Your cart items</h3>
          <form action="#" method="post">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product Name</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartdata.map((item, i) => (
                  <tr className="border-b" key={i}>
                    <td className="py-4 flex items-center">
                      <img className="h-20 w-20 object-cover mr-4" src={item.image} alt={item.title} />
                      <div>
                        <a className="font-semibold hover:underline" href="#">{item.title}</a>
                        <div className="flex items-center mt-1">
                          <a href="#" className="text-blue-500 hover:underline mr-2"><FaPencilAlt /></a>
                          <a href="#" className="text-red-500 hover:underline"><FaTrash /></a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">£{item.price}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button type="button" className="bg-gray-200 rounded-full p-1 mr-2"><FaCaretUp /></button>
                        <input type="text" value={item.quantity} className="w-12 text-center border border-gray-300 rounded" readOnly />
                        <button type="button" className="bg-gray-200 rounded-full p-1 ml-2"><FaCaretDown /></button>
                      </div>
                    </td>
                    <td className="py-4">£{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <a className="text-blue-500 hover:underline" href="#">Back to Shop</a>
              <div>
                <button className="bg-yellow-400 text-white px-4 py-2 rounded" type="submit" disabled>Update</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" type="reset">Clear All</button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-semibold">Related Products</h3>
          </div>
          <ul className="flex flex-wrap justify-between">
            {data.map((item, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow-md w-1/4 m-2">
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cart;
