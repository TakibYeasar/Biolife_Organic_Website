import React, { useEffect } from 'react';
import "./Categorylist.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaBars, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllCategories, getCategoriesAsync } from '../../../features/product/productSlice';


const Categorylist = () => {

    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    useEffect(() => {
        dispatch(getCategoriesAsync());
    }, []);

    // console.log("Categories:", categories);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching article details.</div>;
    }

    return (
        <div className="col-lg-3 col-md-4 hidden-sm">
            <div className="category-sec">
                <div className="menu-heading">
                    <span className="menu-icon"><FaBars /></span>
                    <span className="menu-title">All departments</span>
                    <span className="menu-angle" data-tgleclass="fa fa-caret-down"><FaCaretDown /></span>
                </div>

                <div className="wrap-menu">
                    {categories.map((item, i) => (
                        <ul key={i} item="true" className="main-menu">
                            <li className="menu-item"><a href="#">{item?.cat_name} <FaAngleRight className="icon" /></a></li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categorylist