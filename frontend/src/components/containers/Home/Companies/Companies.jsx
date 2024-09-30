import React, { useEffect } from 'react';
import "./Companies.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { getBrandsAsync } from '../../../../features/root/rootService';
import { selectIsLoading, selectIsError, selectAllBrands } from '../../../../features/root/rootSlice';

const Companies = () => {

  const dispatch = useDispatch();
  const brands = useSelector(selectAllBrands);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getBrandsAsync());
  }, []);

  // console.log("Brands:", brands);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }

  return (
    <div className="companies-sec">
      <div className="container">
        <ul className="brand-slide d-flex">

          {brands.map((item, i) => (
            <li key={i} item="true">
              <div className="biolife-brd-container">
                <a href="#" className="link">
                  <figure><img src={item?.image} width={214} height={163} alt="" /></figure>
                </a>
              </div>
            </li>
          ))}


        </ul>
      </div>
    </div>
  )
}

export default Companies