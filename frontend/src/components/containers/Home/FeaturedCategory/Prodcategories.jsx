import React, { useRef, useEffect, useState } from 'react';
import "./Prodcategories.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesAsync } from '../../../../features/product/productService';
import { selectIsLoading, selectIsError, selectAllCategories } from '../../../../features/product/productSlice';

const Prodcategories = () => {

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);

  // console.log("Categories:", categories);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }

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

              {categories.map((item, i) => (
                <motion.div key={i} item className="col-lg-3 prod-item">
                  <div className="cat-box-item">
                    <div className="card-thum">
                      <a href="#" className="cart-link"><img src={item.image} alt="" /></a>
                    </div>
                    <div className="cat-info text-center" href="#">
                      <a href="#">
                        <h4 className="cat-name">{item?.cat_name}</h4>
                        <span className="cat-number">({item?.product_count} items)</span>
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

export default Prodcategories