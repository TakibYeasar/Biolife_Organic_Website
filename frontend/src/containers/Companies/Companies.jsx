import React, { useEffect } from 'react';
import "./Companies.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllBrands, getBrandsAsync } from '../../features/root/rootSlice';
// import brand01 from "../../../../assets/images/megamenu/brand-eco-teas.png";
// import brand02 from "../../../../assets/images/megamenu/brand-explore.png";
// import brand03 from "../../../../assets/images/megamenu/brand-organic-2.png";
// import brand04 from "../../../../assets/images/megamenu/brand-organic.png";

// const brands = [
//   {
//     image: brand01,
//   },
//   {
//     image: brand02,
//   },
//   {
//     image: brand03,
//   },
//   {
//     image: brand04,
//   },
// ]

const Companies = () => {

  const dispatch = useDispatch();
  const brands = useSelector(selectAllBrands);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getBrandsAsync());
  }, []);

  // console.log("Brands:", brands);

  return (
    <div className="companies-sec">
      <div className="container">
        <ul className="brand-slide d-flex">

          {loading && <div>Loading brands...</div>}
          {error && <div>Error fetching brands: {error.message}</div>}

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