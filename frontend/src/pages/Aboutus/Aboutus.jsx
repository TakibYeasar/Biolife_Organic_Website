import React from 'react';
import "./Aboutus.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaStar, FaStarHalf } from "react-icons/fa";
import bg from "../../../../assets/images/home/biolife-banner__style-01.jpg";
import bn01 from "../../../../assets/images/about-us/bn01.jpg"; 
import bn04 from "../../../../assets/images/about-us/bn04.jpg";
import author01 from "../../../../assets/images/about-us/author-01.png";
import author02 from "../../../../assets/images/about-us/author-02.png";
import author03 from "../../../../assets/images/about-us/author-03.png";
import quotes from "../../../../assets/images/about-us/double-quotes.png";

const Aboutus = () => {
    return (
        <div className="aboutus-sec">
            <div className="breadcrumb">
                <img src={bg} alt="" className='img-fluid' />
                <h1 className='title'>Organic Fruits</h1>
            </div>
            <div className="container">
                <div className="boillife-nav d-flex">
                    <a href="/">Home</a>
                    <span>/</span>
                    <a href="/about">About us</a>
                </div>

                <div className="row">
                    <div className="boillife-store">
                        <div className="store-heading text-center">
                            <h4 className="main-title">Welcome to Biolife store!</h4>
                        </div>
                        <div className="store-content d-flex">
                            <div className="store-image">
                                <img src={bn01} alt="" />
                            </div>
                            <div className="text-content col-lg-6 col-md-6 col-sm-12 flex-end">
                                <p className="store-desc">
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
                                </p>
                                <p className="quote-text">“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="whyus-sec">
                        <div className="whyus-heading text-center">
                            <h4 className="main-title">Why Choose us</h4>
                            <p className="subtitle">Natural food is taken from the world's most modern farms with strict safety cycles</p>
                        </div>
                        <div className="whyus-content d-flex">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <ul className="reasons-sec">
                                    <li className="reasons-item">
                                        <div className="icon"></div>
                                        <h1 className="reasons-num">01</h1>
                                        <p className="reasons-title">Always Fresh</p>
                                        <p className="desc">Natural products are kept in the best condition to ensure always fresh</p>
                                    </li>
                                    <li className="reasons-item">
                                        <div className="icon"></div>
                                        <h1 className="reasons-num">02</h1>
                                        <p className="reasons-title">Overall Healthy</p>
                                        <p className="desc">Natural products are kept in the best condition to ensure always fresh</p>
                                    </li>
                                    <li className="reasons-item">
                                        <div className="icon"></div>
                                        <h1 className="reasons-num">03</h1>
                                        <p className="reasons-title">Encironmental Safety</p>
                                        <p className="desc">Natural products are kept in the best condition to ensure always fresh</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="whyus-banner">
                                    <img src={bn04} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <ul className="reasons-sec">
                                    <li className="reasons-item">
                                        <div className="icon"></div>
                                        <h1 className="reasons-num">04</h1>
                                        <p className="reasons-title">Antioxidant Capacity</p>
                                        <p className="desc">Natural products are kept in the best condition to ensure always fresh</p>
                                    </li>
                                    <li className="reasons-item">
                                        <div className="icon"></div>
                                        <h1 className="reasons-num">05</h1>
                                        <p className="reasons-title">Good For Arteries</p>
                                        <p className="desc">Natural products are kept in the best condition to ensure always fresh</p>
                                    </li>
                                    <li className="reasons-item">
                                        <div className="icon"></div>
                                        <h1 className="reasons-num">06</h1>
                                        <p className="reasons-title">Quality Standards</p>
                                        <p className="desc">Natural products are kept in the best condition to ensure always fresh</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="testimonial-sec">
                        <div className="testimonial-heading d-flex align-items-center justify-content-center">
                            <FaStar className="icon" />
                            <FaStar className="icon" />
                            <FaStar className="icon" />
                            <h4 className="main-title">Testimonial</h4>
                            <FaStar className="icon" />
                            <FaStar className="icon" />
                            <FaStar className="icon" />
                        </div>

                        <div className="testimonial-slider">
                            <ul className="slider-sec d-flex">
                                <li className="slider-item">
                                    <div className="featured-item">
                                        <div className="img-sec text-center">
                                            <div className="author-img">
                                                <img src={author01} alt="" />
                                            </div>
                                            <img src={quotes} alt="" />
                                        </div>
                                        <div className="item-desc text-center">
                                            <p className="desc">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                                            <div className="bottom-desc text-center">
                                                <b className="name">Ms. Jay Doe</b><br />
                                                <b className="title">Sales Manager</b>
                                                <div className="ratings d-flex">
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStarHalf className="icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="slider-item">
                                    <div className="featured-item">
                                        <div className="img-sec text-center">
                                            <div className="author-img">
                                                <img src={author02} alt="" />
                                            </div>
                                            <img src={quotes} alt="" />
                                        </div>
                                        <div className="item-desc text-center">
                                            <p className="desc">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                                            <div className="bottom-desc text-center">
                                                <b className="name">Mr. Braun</b><br />
                                                <b className="title">Sales Manager</b>
                                                <div className="ratings d-flex">
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStarHalf className="icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="slider-item">
                                    <div className="featured-item">
                                        <div className="img-sec text-center">
                                            <div className="author-img">
                                                <img src={author03} alt="" />
                                            </div>
                                            <img src={quotes} alt="" />
                                        </div>
                                        <div className="item-desc text-center">
                                            <p className="desc">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                                            <div className="bottom-desc text-center">
                                                <b className="name">Ms. Danien</b><br />
                                                <b className="title">Sales Manager</b>
                                                <div className="ratings d-flex">
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStar className="icon" />
                                                    <FaStarHalf className="icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Aboutus