import React, { useRef, useEffect, useState } from 'react';
import "./Onsaleprod.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getOnsaleprodAsync } from '../../../features/product/productService';
import { selectIsLoading, selectIsError, selectAllOnsaleprod } from '../../../features/product/productSlice';
import { Singleprod } from "../../../components";


const Onsaleprod = () => {

    const dispatch = useDispatch();
    const onsaleprod = useSelector(selectAllOnsaleprod);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    useEffect(() => {
        dispatch(getOnsaleprodAsync());
    }, []);

    // console.log("Onsale Products:", onsaleprod);

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching article details.</div>;
    }


    return (



        <motion.div id="tab_3rd" className="tab-contain">
            <motion.ul ref={carousel} drag="x" dragConstraints={{ right: 0, left: -width }} className="product-list active d-flex">

                {onsaleprod.map((onsaleprodItem, index) => (
                    // Assuming the 'product' field contains an array of products
                    onsaleprodItem.product.map((productItem, productIndex) => (
                        <motion.li key={productItem.id} item className="product-item col-lg-3 col-md-6 col-sm-12">
                            <Singleprod item={productItem} />
                        </motion.li>
                    ))
                ))}

            </motion.ul>
        </motion.div>
    )
}

export default Onsaleprod