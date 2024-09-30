import React from 'react';
import "./Sidebar.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Sidebar = () => {
    return (

        <div>
            <div className="biolife-mobile-panels">
                <span className="biolife-current-panel-title">Sidebar</span>
                <a className="biolife-close-btn" href="#" data-object="open-mobile-filter">&times;</a>
            </div>
            <div className="sidebar-contain">
                <div className="widget biolife-filter">
                    <h4 className="wgt-title">Departements</h4>
                    <div className="wgt-content">
                        <ul className="cat-list">
                            <li className="cat-list-item"><a href="#" className="cat-link">Organic Food</a></li>
                            <li className="cat-list-item"><a href="#" className="cat-link">Fresh Fruit</a></li>
                            <li className="cat-list-item"><a href="#" className="cat-link">Dried Fruits</a></li>
                        </ul>
                    </div>
                </div>

                <div className="widget biolife-filter">
                    <h4 className="wgt-title">Shipping & Pickup</h4>
                    <div className="wgt-content">
                        <ul className="cat-list">
                            <li className="cat-list-item"><a href="#" className="cat-link">Show all</a></li>
                            <li className="cat-list-item"><a href="#" className="cat-link">2- Day shipping</a></li>
                            <li className="cat-list-item"><a href="#" className="cat-link">Shop to Home</a></li>
                            <li className="cat-list-item"><a href="#" className="cat-link">Free Pickup</a></li>
                        </ul>
                    </div>
                </div>

                <div className="widget price-filter biolife-filter">
                    <h4 className="wgt-title">Price</h4>
                    <div className="wgt-content">
                        <div className="frm-contain">
                            <form action="#" name="price-filter" id="price-filter" method="get">
                                <p className="f-item">
                                    <label htmlFor="pr-from">$</label>
                                    <input className="input-number" type="number" id="pr-from" name="price-from" />
                                </p>
                                <p className="f-item">
                                    <label htmlFor="pr-to">to $</label>
                                    <input className="input-number" type="number" id="pr-to" name="price-from" />
                                </p>
                                <p className="f-item"><button className="btn-submit" type="submit">go</button></p>
                            </form>
                        </div>
                        <ul className="check-list bold single">
                            <li className="check-list-item"><a href="#" className="check-link">$0 - $5</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">$5 - $10</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">$15 - $20</a></li>
                        </ul>
                    </div>
                </div>

                <div className="widget biolife-filter">
                    <h4 className="wgt-title">Brand</h4>
                    <div className="wgt-content">
                        <ul className="check-list multiple">
                            <li className="check-list-item"><a href="#" className="check-link">Great Value Organic</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">Plum Organic</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">Shop to Home</a></li>
                        </ul>
                    </div>
                </div>

                <div className="widget biolife-filter">
                    <h4 className="wgt-title">Color</h4>
                    <div className="wgt-content">
                        <ul className="color-list">
                            <li className="color-item"><a href="#" className="c-link"><span className="symbol img-color"></span>Multi</a></li>
                            <li className="color-item"><a href="#" className="c-link"><span className="symbol hex-code color-01"></span>Red</a></li>
                            <li className="color-item"><a href="#" className="c-link"><span className="symbol hex-code color-02"></span>Orrange</a></li>
                            <li className="color-item"><a href="#" className="c-link"><span className="symbol hex-code color-03"></span>Other</a></li>
                        </ul>
                    </div>
                </div>

                <div className="widget biolife-filter">
                    <h4 className="wgt-title">Popular Size</h4>
                    <div className="wgt-content">
                        <ul className="check-list bold multiple">
                            <li className="check-list-item"><a href="#" className="check-link">8oz</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">15oz</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">6oz</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">30oz</a></li>
                        </ul>
                    </div>
                </div>

                <div className="widget biolife-filter">
                    <h4 className="wgt-title">Number of Pieces</h4>
                    <div className="wgt-content">
                        <ul className="check-list bold">
                            <li className="check-list-item"><a href="#" className="check-link">1 to 9</a></li>
                            <li className="check-list-item"><a href="#" className="check-link">10 to 15</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar