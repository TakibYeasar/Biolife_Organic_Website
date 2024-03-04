import React, { useRef, useEffect, useState } from 'react';
import "./Products.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import { getPosts } from "../../actions/post";
import p01 from "../../../../../assets/images/products/p-01.jpg";
import p02 from "../../../../../assets/images/products/p-02.jpg";
import p03 from "../../../../../assets/images/products/p-03.jpg";
import p04 from "../../../../../assets/images/products/p-09.jpg";
import p05 from "../../../../../assets/images/products/p-05.jpg";
import p06 from "../../../../../assets/images/products/p-06.jpg";
import p07 from "../../../../../assets/images/products/p-07.jpg";
import p08 from "../../../../../assets/images/products/p-08.jpg";
import p09 from "../../../../../assets/images/products/p-09.jpg";
import p10 from "../../../../../assets/images/products/p-10.jpg";
import p11 from "../../../../../assets/images/products/p-11.jpg";
import p12 from "../../../../../assets/images/products/p-12.jpg";
import p13 from "../../../../../assets/images/products/p-13.jpg";
import p14 from "../../../../../assets/images/products/p-14.jpg";
import p15 from "../../../../../assets/images/products/p-15.jpg";
import { Singleprod } from "../../../components";


const allproducts = [
  {
    photo_main: p01,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p02,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p03,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p04,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p05,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
]
const topratedprod = [
  {
    photo_main: p06,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p07,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p08,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p09,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
  {
    photo_main: p10,
    category: "consectetur adipisicing",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "850",
    old_price: "950",
  },
]
const onsaleprod = [
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

const Products = () => {

  // const cars = useSelector((state) => state.cars.cars);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCars());
  // }, [dispatch]);

  // const handleDelete = async (vehicleId) => {
  //   try {
  //     await dispatch(deleteVehicle(vehicleId));
  //     await dispatch(fetchCars());
  //     toast.success('Vehicle successfully deleted.');
  //   } catch (error) {
  //     error('something went wrong');
  //   }
  // };

  // const { posts, loading } = useSelector(state => state.post);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);


  return (
    <div className="products-sec">
      <div className="container">

        <div className="prod-heading text-center">
          <p className="subtitle">All the best item for you</p>
          <p className="main-title">Our Products</p>
        </div>

        <div className="prod-categories sm-margin-top-23px">
          <div className="tab-head text-center">
            <ul className="tabs">
              <li className="tab-element active">
                <a href="#tab_1st" className="tab-link">Featured</a>
              </li>
              <li className="tab-element" >
                <a href="#tab_2nd" className="tab-link">Top Rated</a>
              </li>
              <li className="tab-element" >
                <a href="#tab_3rd" className="tab-link">On Sale</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="tab-content">
            <motion.div id="tab_1st" className="tab-contain active">
              <motion.ul ref={carousel} drag="x" dragConstraints={{ right: 0, left: -width }} className="product-list active d-flex">

                {allproducts.map((item, i) => (
                  <motion.li key={i} item="true" className="product-item col-lg-3 col-md-6 col-sm-12">
                    <Singleprod item={item} />
                  </motion.li>
                ))}

              </motion.ul>
            </motion.div>


            <motion.div id="tab_2nd" className="tab-contain">
              <motion.ul ref={carousel} drag="x" dragConstraints={{ right: 0, left: -width }} className="product-list active d-flex">

                {topratedprod.map((item, i) => (
                  <motion.li key={i} item className="product-item col-lg-3 col-md-6 col-sm-12">
                    <Singleprod item={item} />
                  </motion.li>
                ))}

              </motion.ul>
            </motion.div>


            <motion.div id="tab_3rd" className="tab-contain">
              <motion.ul ref={carousel} drag="x" dragConstraints={{ right: 0, left: -width }} className="product-list active d-flex">

                {onsaleprod.map((item, i) => (
                  <motion.li key={i} item className="product-item col-lg-3 col-md-6 col-sm-12">
                    <Singleprod item={item} />
                  </motion.li>
                ))}

              </motion.ul>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Products