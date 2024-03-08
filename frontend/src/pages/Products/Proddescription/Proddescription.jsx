import React from 'react';
import "./Proddescription.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Proddescription = ({product}) => {

    return (
        <div id="tab_1st" className="tab-contain desc-tab active">
            <p className="desc">{product?.description}</p>
        </div>

    )
}


export default Proddescription