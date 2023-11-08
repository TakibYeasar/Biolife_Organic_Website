import React from 'react';
import "./Companies.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import brand01 from "../../../../assets/images/megamenu/brand-eco-teas.png";
import brand02 from "../../../../assets/images/megamenu/brand-explore.png";
import brand03 from "../../../../assets/images/megamenu/brand-organic-2.png";
import brand04 from "../../../../assets/images/megamenu/brand-organic.png";

const brands = [
  {
    image: brand01,
  },
  {
    image: brand02,
  },
  {
    image: brand03,
  },
  {
    image: brand04,
  },
]

const Companies = () => {

  return (
    <div className="companies-sec">
      <div className="container">
        <ul className="brand-slide d-flex">

          {brands.map((item, i) => (
            <li key={i} item>
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