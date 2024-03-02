import React, { useEffect, useState } from 'react';
import "./Banner.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleLeft, FaAngleRight, FaBars, FaCaretDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllBanners, getBannersAsync } from '../../features/root/rootSlice';
// import bg01 from "../../../../assets/images/home/light-main_slide_01.jpg";
// import bg02 from "../../../../assets/images/home/light-main_slide_02.jpg";
// import bg03 from "../../../../assets/images/home/light-main_slide_03.jpg";

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

// const banners = [
//   {
//     image: bg01,
//     title: "Lorem ipsum dolor sit amet",
//     subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
//   {
//     image: bg02,
//     title: "Lorem ipsum dolor sit amet",
//     subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
//   {
//     image: bg03,
//     title: "Lorem ipsum dolor sit amet",
//     subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
// ]

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

  const dispatch = useDispatch();
  const [derection, setDerection] = useState(0);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError); 
  const banners = useSelector(selectAllBanners);

  useEffect(() => {
    dispatch(getBannersAsync());
  }, []);

  // console.log("Banners:", banners);
  

  function nextStep() {
    setDerection(1);
    if (banners.length === 0) return;
    if (derection === banners.length - 1) {
      setDerection(0);
    } else {
      setDerection(prevDirection => prevDirection + 1);
    }
  }

  function prevStep() {
    setDerection(-1);
    if (banners.length === 0) return;
    if (derection === 0) {
      setDerection(banners.length - 1);
    } else {
      setDerection(prevDirection => prevDirection - 1);
    }
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
                  <ul key={i} item="true" className="main-menu">
                    <li className="menu-item"><a href="#">{item?.title} <FaAngleRight className="icon" /></a></li>
                  </ul>
                ))}
              </div>
            </div>
          </div>


          <div className="col-lg-9 col-md-8">
            {loading && <div>Loading banners...</div>}
            {error && <div>Error fetching banners: {error.message}</div>}
            <AnimatePresence initial={false}>
              {banners?.map((item, index) => (
                <motion.div key={item.id || index} className="main-slide" variants={variants} animate="animate" initial="initial" exit="exit" custom={derection} >
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
              </motion.div>
            ))}
            </AnimatePresence>

            <div className="button d-flex">
              <a href="#" onClick={prevStep} className="prev_button"><FaAngleLeft className='icon' /></a>
              <a href="#" onClick={nextStep} className="next_button"><FaAngleRight className='icon' /></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Banner