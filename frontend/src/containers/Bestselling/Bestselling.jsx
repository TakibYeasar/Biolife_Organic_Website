import React, { useRef, useEffect, useState } from 'react';
import "./Bestselling.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import Singleprod from '../Singleprod/Singleprod';
import p06 from "../../../../assets/images/products/p-06.jpg";
import p07 from "../../../../assets/images/products/p-07.jpg";
import p08 from "../../../../assets/images/products/p-08.jpg";
import p09 from "../../../../assets/images/products/p-09.jpg";
import p10 from "../../../../assets/images/products/p-10.jpg";
import p11 from "../../../../assets/images/products/p-11.jpg";
import p12 from "../../../../assets/images/products/p-12.jpg";
import p13 from "../../../../assets/images/products/p-13.jpg";
import p14 from "../../../../assets/images/products/p-14.jpg";
import p15 from "../../../../assets/images/products/p-15.jpg";

const dsproduct = [
  {
    photo_main: p06,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    discounted_price: "850",
    old_price: "950",
  },
  {
    photo_main: p07,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    discounted_price: "850",
    old_price: "950",
  },
  {
    photo_main: p08,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    discounted_price: "850",
    old_price: "950",
  },
  // {
  //   photo_main: p09,
  //   category: "consectetur adipisicing",
  //   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   discounted_price: "850",
  //   old_price: "950",
  // },
  // {
  //   photo_main: p10,
  //   category: "consectetur adipisicing",
  //   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   discounted_price: "850",
  //   old_price: "950",
  // },
]
const bsproduct = [
  {
    photo_main: p11,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p12,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p13,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p14,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p15,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
]

const Bestselling = () => {

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div className="bestselling-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">

              {dsproduct.map((item, i) => (
                <div key={i} item="true" className='discount_prod'>
                  <div className="boillife-banner">
                      <a href="#" className="banner-img"><img src={item?.photo_main} alt="" /></a>
                    <div className="text-content">
                      <b className="title">{item?.title}</b><br />
                      <b className="price">Only:  <span>{item?.discounted_price}</span></b><br/>
                      <a href="#" className="btn-style">shop now</a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="col-lg-8">
            <div className="bestselling-prod">
              <div className="title-box">
                <h3 className="main-title">Bestselling products</h3>
              </div>

              <motion.div className="bestselling_prodlist">
                <motion.ul ref={carousel} drag="x" dragConstraints={{ right: 0, left: -width }} className="prod-list d-flex">

                  {bsproduct.map((item, i) => (
                    <motion.li key={i} item className="product-item col-lg-4 col-md-6 col-sm-12">
                      <Singleprod item={item} />
                    </motion.li>
                  ))}

                </motion.ul>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Bestselling