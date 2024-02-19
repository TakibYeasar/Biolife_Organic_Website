import axios from "axios";
import { toast } from "react-toastify";
import { domain } from "../../env";

//Get Categories
export const getCategories = async (_) => {
    const response = await axios.get(`${domain}/core/all-categories/`);
    return response.data;
};

//Get Single Category
export const getSinglecategory = async (catId) => {
    const response = await axios.get(`${domain}/core/single-cat/${catId}`);
    return response.data;
};


//Get All products
export const getAllproducts = async (_) => {
    const response = await axios.get(`${domain}/core/all-products/`);
    return response.data;
};

//Get Single Product
export const getSingleproduct = async (prodId) => {
    const response = await axios.get(`${domain}/core/single-prod/${prodId}`);
    return response.data;
};

//Like unlike product
export const reactionProd = async (prodId, reactionData) => {
    const response = await axios.post(`${domain}/core/like-unlike-prod/${prodId}/`, reactionData);
    return response.data;
};

//Review product
export const reviewProd = async (prodId, reviewData) => {
    const response = await axios.post(`${domain}/core/single-prod/${prodId}/review-prod/`, reviewData);
    return response.data;
};

//Update review
export const updateReview = async (prodId, reviewId, reviewData) => {
    const response = await axios.put(`${domain}/core/single-prod/${prodId}/review-prod/${reviewId}/update-review/`, reviewData);
    return response.data;
};


//Delete review
export const deleteReview = async (prodId, reviewId) => {
    const response = await axios.delete(`${domain}/core/single-prod/${prodId}/review-prod/${reviewId}/delete-review/`);
    return response.data;
};


//Get Top rated product
export const getTopratedprod = async (_) => {
    const response = await axios.get(`${domain}/core/toprated-prod/`);
    return response.data;
};


//Get Onsale product
export const getOnsaleprod = async (_) => {
    const response = await axios.get(`${domain}/core/onsale-prod/`);
    return response.data;
};


//Get Bestselling product
export const getBestsellingprod = async (_) => {
    const response = await axios.get(`${domain}/core/bestselling-prod/`);
    return response.data;
};


//Get Discount product
export const getDiscountprod = async (_) => {
    const response = await axios.get(`${domain}/core/discount-prod/`);
    return response.data;
};


