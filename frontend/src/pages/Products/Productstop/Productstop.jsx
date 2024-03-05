import React from 'react';
import "./Productstop.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import p1 from "../../../../../assets/images/products/p-01.jpg";
import p2 from "../../../../../assets/images/products/p-02.jpg";
import p3 from "../../../../../assets/images/products/p-03.jpg";
import p4 from "../../../../../assets/images/products/p-17.jpg";
import p5 from "../../../../../assets/images/products/p-05.jpg";
import { Singleprod } from "../../../components";

const prod_one = [
    {
        image: p1,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p2,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p3,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p4,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p5,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
]

const Productstop = () => {
    return (

        <div className="block-item recently-products-cat md-margin-bottom-39">
            <ul className="products-list biolife-carousel nav-center-02 nav-none-on-mobile"  >

                {prod_one?.map((item, i) => (
                    <li key={i} item className="product-item col-lg-3 col-md-6 col-sm-12">
                        <Singleprod product={item?.product} />
                    </li>
                ))}


            </ul>
        </div>
    )
}

export default Productstop