import React, { useState } from 'react';
import "./Banner.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleLeft, FaAngleRight, FaBars, FaCaretDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import bg01 from "../../../../assets/images/home/light-main_slide_01.jpg";
import bg02 from "../../../../assets/images/home/light-main_slide_02.jpg";
import bg03 from "../../../../assets/images/home/light-main_slide_03.jpg";

const category = [
  {
    title: "Fruit & Nut Gifts",
  },
  {
    title: "Vegetables",
  },
  {
    title: "Fresh Berries",
  },
  {
    title: "Ocean Foods",
  },
  {
    title: "Butter & Eggs",
  },
  {
    title: "Fastfood",
  },
  {
    title: "Fresh Meat",
  },
  {
    title: "Fresh Onion",
  },
  {
    title: "Papaya & Crisps",
  },
  {
    title: "Oatmeal",
  },
  {
    title: "Fresh Bananas & Plantains",
  },
]

const banner = [
  {
    image: bg01,
    title: "Lorem ipsum dolor sit amet",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  // {
  //   image: bg02,
  //   title: "Lorem ipsum dolor sit amet",
  //   subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  // },
  // {
  //   image: bg03,
  //   title: "Lorem ipsum dolor sit amet",
  //   subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  // },
]

const variants = {
  initial: derection => {
    return {
      x: derection > 0 ? 200 : -200,
      opacity: 0,
    }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: "ease-in",
    // transition: {
    //   x: {type: "spring", stiffness: 300, damping: 20}
    // }
  },
  exit: derection => {
    return {
      x: derection > 0 ? -200 : 200,
      opacity: 0,
    }
  }
}

const Banner = () => {

  const [items, setItems] = useState();
  const [derection, setDerection] = useState(0);

  function nextStep() {
    setDerection(+1);
    if (items == items.length - 1) {
      setItems(0);
      return
    }
    setItems(items + 1);
  }

  function prevStep() {
    setDerection(-1);
    if (items == 0) {
      setItems(items.length - 1);
      return
    }
    setItems(items - 1);
  }

  return (
    <div className="banner-sec">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-4 hidden-sm">
            <div className="category-sec">
              <div className="menu-heading">
                <span className="menu-icon"><FaBars /></span>
                <span className="menu-title">All departments</span>
                <span className="menu-angle" data-tgleclass="fa fa-caret-down"><FaCaretDown /></span>
              </div>

              <div className="wrap-menu">
                {category.map((item, i) => (
                  <ul key={i} item className="main-menu">
                    <li className="menu-item"><a href="#">{item?.title} <FaAngleRight className="icon" /></a></li>
                  </ul>
                ))}
              </div>
            </div>
          </div>


          <div className="col-lg-9 col-md-8">
            {banner.map((item, i) => (
              <motion.div className="main-slide" variants={variants} animate="animate" initial="initial" exit="exit" custom={derection} key={i} item>
                <AnimatePresence initial={false}>
                  <img src={item.image} alt="" />
                  <div className="slide-contain">
                    <i className="first-line">{item.title}</i>
                    <h1 className="second-line">{item.subtitle}</h1>
                    <p className="third-line">{item.desc}</p>
                    <p className="buttons">
                      <a href="#" className="btn-style">Shop now</a>
                      <a href="#" className="btn-outline-border">View lookbook</a>
                    </p>
                  </div>
                </AnimatePresence>
                <div className="button d-flex">
                  <a href="" onClick={prevStep} className="prev_button"><FaAngleLeft className='icon' /></a>
                  <a href="" onClick={nextStep} className="next_button"><FaAngleRight className='icon' /></a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Banner