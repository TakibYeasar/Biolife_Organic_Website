import React, { useRef, useEffect, useState } from 'react';
import "./Discountprod.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllDiscountprod, getDiscountprodAsync } from '../../../features/product/productSlice';


const Discountprod = () => {

  const dispatch = useDispatch();
  const discountprod = useSelector(selectAllDiscountprod);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getDiscountprodAsync());
  }, []);

  // console.log("Discount Products:", discountprod);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }


  return (
    <div>

      {discountprod.map((item, i) => (
        <div key={i} item="true" className='discount_prod'>
          <div className="boillife-banner">
            <a href="#" className="banner-img"><img src={item?.photo_main} alt="" /></a>
            <div className="text-content">
              <b className="title">{item?.title}</b><br />
              <b className="price">Only:  <span>{item?.discounted_price}</span></b><br />
              <a href="#" className="btn-style">shop now</a>
            </div>
          </div>
        </div>
      ))}
    </div>


  )
}

export default Discountprod