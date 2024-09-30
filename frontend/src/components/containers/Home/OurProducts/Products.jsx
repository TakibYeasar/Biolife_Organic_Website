import React, { useRef, useEffect, useState } from 'react';
import "./Products.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getAllproductsAsync } from '../../../../features/product/productService';
import { selectIsLoading, selectIsError, selectAllproducts } from '../../../../features/product/productSlice';
import { Singleprod } from "../../..";
import Topratedprod from '../../../../../../New folder/Home/Topratedprod/Topratedprod';
import Onsaleprod from '../../../../../../New folder/Home/Onsaleprod/Onsaleprod';


const Products = () => {

  const dispatch = useDispatch();
  const allproducts = useSelector(selectAllproducts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getAllproductsAsync());
  }, []);

  // console.log("Products:", allproducts);

  const [width, setWidth] = useState(0);
  const carousel = useRef();

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

                {allproducts.slice(0, 5).map((item, i) => (
                  <motion.li key={i} item="true" className="product-item col-lg-3 col-md-6 col-sm-12">
                    <Singleprod item={item} />
                  </motion.li>
                ))}

              </motion.ul>
            </motion.div>


            <Topratedprod />

            <Onsaleprod />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Products