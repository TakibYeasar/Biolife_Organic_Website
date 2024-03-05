import React from 'react';
import "./Producttags.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Producttags = () => {
    return (

        <div className="widget biolife-filter">
            <h4 className="wgt-title">Product Tags</h4>
            <div className="wgt-content">
                <ul className="tag-cloud">
                    <li className="tag-item"><a href="#" className="tag-link">Fresh Fruit</a></li>
                    <li className="tag-item"><a href="#" className="tag-link">Natural Food</a></li>
                    <li className="tag-item"><a href="#" className="tag-link">Hot</a></li>
                    <li className="tag-item"><a href="#" className="tag-link">Organics</a></li>
                    <li className="tag-item"><a href="#" className="tag-link">Dried Organic</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Producttags