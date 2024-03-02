import React, { useEffect } from 'react';
import "./Features.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaBeer, FaCalendarAlt, FaCarAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllFeatureds, getFeaturedAsync } from '../../features/root/rootSlice';
// import post1 from "../../../../assets/images/home/bn_style08.png";
// import post2 from "../../../../assets/images/home/bn_style09.png";
// import post3 from "../../../../assets/images/home/bn_style10.png";

// const featured = [
//   {
//     image: post1,
//     title: "Sumer Fruit",
//     subtitle: "100% Pure Natural Fruit Juice",
//   },
//   {
//     image: post2,
//     title: "California",
//     subtitle: "Fresh Fruit Association",
//   },
//   {
//     image: post3,
//     title: "Naturally fresh taste",
//     subtitle: "With 25% Off All Teas.",
//   },
// ]


const Features = () => {

  const dispatch = useDispatch();
  const featureds = useSelector(selectAllFeatureds);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getFeaturedAsync());
  }, []);

  // console.log("Featureds:", featureds);

  return (
    <div className="featured_sec">
      <div className="container">
        <ul className="row ">
          {loading && <div>Loading featureds...</div>}
          {error && <div>Error fetching featureds: {error.message}</div>}
          {featureds.map((item, i) => (
            <li className='col-lg-4 featured_item' key={i} item="true">
              <div className="banner-contain">
                <div className="media">
                  <a href="#" className="bn-link"><img src={item?.image} width={193} height={185} alt="" /></a>
                </div>
                <div className="text-content">
                  <span className="title">{item?.title}</span><br/>
                  <b className="subtitle">{item?.subtitle}</b>
                </div>
              </div>
            </li>
          ))}

        </ul>

        <div className="row">
          <ul className="services-list">
            <li>
              <div className="service-inner">
                <div className="d-flex">
                  <span className="number">1</span>
                  <FaBeer className='icon' />
                </div>
                <a className="srv-name" href="#">full stamped product</a>
              </div>
            </li>
            <li>
              <div className="service-inner">
                <div className="d-flex">
                  <span className="number">2</span>
                  <FaCalendarAlt className='icon' />
                </div>
                <a className="srv-name" href="#">place and delivery on time</a>
              </div>
            </li>
            <li>
              <div className="service-inner">
                <div className="d-flex">
                  <span className="number">3</span>
                  <FaCarAlt className='icon' />
                </div>
                <a className="srv-name" href="#">Free shipping in the city</a>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Features