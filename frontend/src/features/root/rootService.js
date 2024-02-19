import { toast } from "react-toastify";
import axios from "axios";
import { domain } from "../../env";

//Get Banners
export const getBanners = async (_) => {
    const response = await axios.get(`${domain}/core/banners/`);
    return response.data;
};


//Get Featured
export const getFeatured = async (_) => {
    const response = await axios.get(`${domain}/core/featured/`);
    return response.data;
};


//Get Specialoffer
export const getSpecialoffer = async (_) => {
    const response = await axios.get(`${domain}/core/special-offer/`);
    return response.data;
};


//Get All brands
export const getAllbrands = async (_) => {
    const response = await axios.get(`${domain}/core/all-brands/`);
    return response.data;
};

