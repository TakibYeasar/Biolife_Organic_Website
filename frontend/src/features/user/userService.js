import axios from "axios";
import { domain } from "../../env";
import { toast } from "react-toastify";

// view profile
export const profileView = async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${domain}/auth/profile/`);
        return response.data;
    } catch (err) {
        toast.error(`Profile Not Found`);
        console.error(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
};

// update profile
export const updateProfile = async (userData, thunkAPI) => {
    try {
        const response = await axios.put(`${domain}/auth/update-profile/`, userData);
        return response.data;
    } catch (err) {
        toast.error(`Profile updated failed`);
        console.error(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
};


// add address
export const addAddress = async (addressData, thunkAPI) => {
    try {
        const response = await axios.post(`${domain}/auth/add-address/`, addressData);
        return response.data;
    } catch (err) {
        toast.error(`Address add failed`);
        console.error(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
};

// edit address
export const editAddress = async (addressData, thunkAPI) => {
    try {
        const response = await axios.put(`${domain}/auth/update-address/`, addressData);
        return response.data;
    } catch (err) {
        toast.error(`Address edit failed`);
        console.error(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
};


// delete address
export const removeAddress = async (_, thunkAPI) => {
    try {
        const response = await axios.delete(`${domain}/auth/remove-address/`);
        return response.data;
    } catch (err) {
        toast.error(`Address removed failed`);
        console.error(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
};
