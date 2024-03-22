import React, { useEffect } from 'react';
import "./Features.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaBeer, FaCalendarAlt, FaCarAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getFeaturedAsync } from '../../../features/root/rootService';
import { selectIsLoading, selectIsError, selectAllFeatureds} from '../../../features/root/rootSlice';


const Features = () => {

  const dispatch = useDispatch();
  const featureds = useSelector(selectAllFeatureds);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getFeaturedAsync());
  }, []);

  // console.log("Featureds:", featureds);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }

  return (
    <div className="featured_sec">
      <div className="container">
        <ul className="row ">
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