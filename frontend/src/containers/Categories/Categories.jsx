import React, { useRef, useEffect, useState } from 'react';
import "./Categories.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import p01 from "../../../../assets/images/products/p-01.jpg";
import p02 from "../../../../assets/images/products/p-02.jpg";
import p03 from "../../../../assets/images/products/p-03.jpg";
import p04 from "../../../../assets/images/products/p-09.jpg";
import p05 from "../../../../assets/images/products/p-05.jpg";

const category = [
  {
    image: p01,
    title: "Lorem ipsum dolor sit amet.",
  },
  {
    image: p02,
    title: "Lorem ipsum dolor sit amet.",
  },
  {
    image: p03,
    title: "Lorem ipsum dolor sit amet.",
  },
  {
    image: p04,
    title: "Lorem ipsum dolor sit amet.",
  },
  {
    image: p05,
    title: "Lorem ipsum dolor sit amet.",
  },
  {
    image: p03,
    title: "Lorem ipsum dolor sit amet.",
  },
  {
    image: p04,
    title: "Lorem ipsum dolor sit amet.",
  },
  {
    image: p05,
    title: "Lorem ipsum dolor sit amet.",
  },
]

const Categories = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div className="categories-sec">
      <div className="container">
        <div className="row">
          <div className="top-info text-center">
            <p className="menu-subtitle">HOT CATEGORIES 2019</p>
            <h4 className="menu-title">Featured Categories</h4>
            <i className="menu-desc">Natural food is taken from the world's most modern farms with strict safety cycles</i>
          </div>

          <motion.div className="category-type">
            <motion.div ref={carousel} drag="x" dragConstraints={{ right: 0, left: -width }} className="category-item d-flex">

              {category.map((item, i) => (
                <motion.div key={i} item className="col-lg-3 prod-item">
                  <div className="cat-box-item">
                    <div className="card-thum">
                      <a href="#" className="cart-link"><img src={item.image} alt="" /></a>
                    </div>
                    <div className="cat-info text-center" href="#">
                      <a href="#">
                        <h4 className="cat-name">{item?.title}</h4>
                        <span className="cat-number">(20 items)</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}

            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Categories