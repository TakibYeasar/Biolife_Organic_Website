import React from 'react';
import "./Specialoffer.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import bg03 from "../../../../assets/images/home/bg-right-follow.jpg";

const soffer = [
  {
    title: "Special Offer!",
    subtitle: "Special discount for all fruit products",
    image: bg03,
  },
]


const Specialoffer = () => {

  return (
    <div className="special-offer-sec">
      <div className="container">
        <div className="row">
          {soffer.map((item, i) => (
            <div key={i} item="true" className="special_offer d-flex">
              <div className="col-lg-4 col-md-12">
                <div className="text-content text-center">
                  <span className="sub-line">{item?.title}</span><br />
                  <b className="first-line">{item?.subtitle}</b>
                  <div className="biolife-countdown" data-datetime="2020-01-18 00:00 +00:00"></div>
                  <p className="buttons">
                    <a href="#" className="btn-style btn-bold">See Offer Now!</a>
                  </p>
                </div>
              </div>

              <div className="col-lg-8 col-md-12">
                <div className="banner-content d-flex">
                  <div className="img-moving position-1">
                    <a href="#" className="banner-link"><img src={item?.image} width={780} height={450} alt="img msv" /></a>
                  </div>
                  {/* <div class="img-moving position-2">
                    <img src={promotion2} width={149} height={139} alt="img msv" />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Specialoffer