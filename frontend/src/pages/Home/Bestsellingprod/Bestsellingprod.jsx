import React, { useRef, useEffect, useState } from 'react';
import "./Bestsellingprod.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllBestsellingprod, getBestsellingprodAsync } from '../../../features/product/productSlice';
import { Singleprod } from "../../../components";

const Bestsellingprod = () => {

  const dispatch = useDispatch();
  const bestsellingprod = useSelector(selectAllBestsellingprod);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getBestsellingprodAsync());
  }, []);

  // console.log("Bestselling Products:", bestsellingprod);

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
    <div className="bestselling-prod">
      <div className="title-box">
        <h3 className="main-title">Bestselling products</h3>
      </div>

      <motion.div className="bestselling_prodlist">
        <motion.ul ref={carousel} drag="x" dragConstraints={{ right: 0, left: -width }} className="prod-list d-flex">

          {bestsellingprod.map((bestsellingprodItem, index) => (
            bestsellingprodItem.product.map((productItem, productIndex) => (
              <motion.li key={productItem.id} item className="product-item col-lg-4 col-md-6 col-sm-12">
                <Singleprod item={productItem} />
              </motion.li>
            ))
          ))}

        </motion.ul>
      </motion.div>

    </div>
  )
}

export default Bestsellingprod