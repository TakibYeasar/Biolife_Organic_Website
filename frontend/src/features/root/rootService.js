import axios from "axios";
import { domain } from "../../env";

//Get Banners
export const getBanners = async (_) => {
    const response = await axios.get(`${domain}/api/core/banners`);
    return response.data;
};


//Get Featured
export const getFeatured = async (_) => {
    const response = await axios.get(`${domain}/api/core/featured`);
    return response.data;
};


//Get Specialoffer
export const getSpecialoffer = async (_) => {
    const response = await axios.get(`${domain}/api/core/specialoffer`);
    return response.data;
};


//Get All brands
export const getBrands = async (_) => {
    const response = await axios.get(`${domain}/api/core/brands`);
    return response.data;
};

