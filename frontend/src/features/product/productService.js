import axios from "axios";
import { domain } from "../../env";

//Get Categories
export const getCategories = async (_) => {
    const response = await axios.get(`${domain}/api/products/product_categories`);
    return response.data;
};

//Get Single Category
export const getSinglecategory = async (catId) => {
    const response = await axios.get(`${domain}/api/products/single/category/${catId}`);
    return response.data;
};


//Get All products
export const getAllproducts = async (_) => {
    const response = await axios.get(`${domain}/api/products/all_products`);
    return response.data;
};

//Get Single Product
export const getSingleproduct = async (prodId) => {
    const response = await axios.get(`${domain}/api/products/single/product/${prodId}`);
    return response.data;
};

//Review product
export const reviewProd = async (prodId, reviewData) => {
    const response = await axios.post(`${domain}/api/products/product/${prodId}/create/review`, reviewData);
    return response.data;
};

//Update review
export const updateReview = async (reviewId, reviewData) => {
    const response = await axios.put(`${domain}/api/products/product/update/review/${reviewId}`, reviewData);
    return response.data;
};


//Delete review
export const deleteReview = async (reviewId) => {
    const response = await axios.delete(`${domain}/api/products/product/delete/review/${reviewId}`);
    return response.data;
};


//Get Top rated product
export const getTopratedprod = async (_) => {
    const response = await axios.get(`${domain}/api/products/toprated_prod`);
    return response.data;
};


//Get Onsale product
export const getOnsaleprod = async (_) => {
    const response = await axios.get(`${domain}/api/products/onsale_prod`);
    return response.data;
};


//Get Bestselling product
export const getBestsellingprod = async (_) => {
    const response = await axios.get(`${domain}/api/products/bestselling_prod`);
    return response.data;
};


//Get Discount product
export const getDiscountprod = async (_) => {
    const response = await axios.get(`${domain}/api/products/discount_prod`);
    return response.data;
};


