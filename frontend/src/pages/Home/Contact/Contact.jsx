import React from 'react';
import "./Contact.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  return (
    <section>
      <div className="breadcrumb">
        <h1>Organic Fruits</h1>
      </div>
      <div className="contact-sec">
        <div className="container">
          <div className="boillife-nav d-flex">
            <a href="/" className="home-page">Home</a>
            <span>/</span>
            <a href="/contact" className="nav-item d-flex">Contact us</a>
          </div>
        </div>

        <div className="contact-us-sec">
          <div className="container">

            <div className="row">

              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="contact-info">
                  <h4 className="box-title">Our Contact</h4>
                  <p className="frst-desc">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                  <ul className="addr-info">
                    <li>
                      <div className="if-item d-flex">
                        <b className="tie">Addess:</b>
                        <p className="dsc">7563 St. Vicent Place, Glasgow, Greater<br />Newyork NH7689, UK</p>
                      </div>
                    </li>
                    <li>
                      <div className="if-item d-flex">
                        <b className="tie">Phone:</b>
                        <p className="dsc">(800) 123 456789</p>
                      </div>
                    </li>
                    <li>
                      <div className="if-item d-flex">
                        <b className="tie">Email:</b>
                        <p className="dsc">Organic@example.com</p>
                      </div>
                    </li>
                    <li>
                      <div className="if-item d-flex">
                        <b className="tie">Store Open:</b>
                        <p className="dsc">8am - 08pm, Mon - Sat</p>
                      </div>
                    </li>
                  </ul>
                  <div className="biolife-social inline">
                    <ul className="socials d-flex">
                      <li><a href="#" title="twitter" className="socail-btn"><FaTwitter aria-hidden="true" /></a></li>
                      <li><a href="#" title="facebook" className="socail-btn"><FaFacebook aria-hidden="true" /></a></li>
                      <li><a href="#" title="pinterest" className="socail-btn"><FaPinterest aria-hidden="true" /></a></li>
                      <li><a href="#" title="youtube" className="socail-btn"><FaYoutube aria-hidden="true" /></a></li>
                      <li><a href="#" title="instagram" className="socail-btn"><FaInstagram aria-hidden="true" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="contact-form">
                  <form action="#" name="frm-contact" >
                    <p className="form-row">
                      <input type="text" name="name" value="" placeholder="Your Name" className="txt-input" />
                    </p>
                    <p className="form-row">
                      <input type="email" name="email" value="" placeholder="Email Address" className="txt-input" />
                    </p>
                    <p className="form-row">
                      <input type="tel" name="phone" value="" placeholder="Phone Number" className="txt-input" />
                    </p>
                    <p className="form-row">
                      <textarea name="mes" id="mes-1" cols="30" rows="9" placeholder="Leave Message"></textarea>
                    </p>
                    <p className="form-row">
                      <button className="btn-style" type="submit">send message</button>
                    </p>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact