import React from 'react';
import "./Categorylist.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaBars, FaCaretDown } from "react-icons/fa";

const category = [
    {
        title: "Fruit & Nut Gifts",
    },
    {
        title: "Vegetables",
    },
    {
        title: "Fresh Berries",
    },
    {
        title: "Ocean Foods",
    },
    {
        title: "Butter & Eggs",
    },
    {
        title: "Fastfood",
    },
    {
        title: "Fresh Meat",
    },
    {
        title: "Fresh Onion",
    },
    {
        title: "Papaya & Crisps",
    },
    {
        title: "Oatmeal",
    },
    {
        title: "Fresh Bananas & Plantains",
    },
]


const Categorylist = () => {

    return (
        <div className="col-lg-3 col-md-4 hidden-sm">
            <div className="category-sec">
                <div className="menu-heading">
                    <span className="menu-icon"><FaBars /></span>
                    <span className="menu-title">All departments</span>
                    <span className="menu-angle" data-tgleclass="fa fa-caret-down"><FaCaretDown /></span>
                </div>

                <div className="wrap-menu">
                    {category.map((item, i) => (
                        <ul key={i} item="true" className="main-menu">
                            <li className="menu-item"><a href="#">{item?.title} <FaAngleRight className="icon" /></a></li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categorylist