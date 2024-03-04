import React, { useEffect, useState } from 'react';
import "./Banner.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleLeft, FaAngleRight, FaBars, FaCaretDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllBanners, getBannersAsync } from '../../../features/root/rootSlice';

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
    <div className="banner-sec col-lg-9 col-md-8">
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
  )
}

export default Banner