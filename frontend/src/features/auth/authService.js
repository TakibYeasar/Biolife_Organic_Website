import axios from "axios";
import { domain } from "../../env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


// user registration
export const registerUserAsync = createAsyncThunk("auth/registerUser",
        async (userData, thunkAPI) => {
                try {
                        console.log(userData);
                        const response = await axios.post(`${domain}/api/auth/register-user/`, userData);

                        if (response.data) {
                                localStorage.setItem("user", JSON.stringify(response.data));
                                localStorage.setItem("token", JSON.stringify(response.data));
                        }
                        return response.data;
                } catch (err) {
                        toast.error(`Registration failed`);
                        console.error(err.response.data);
                        return thunkAPI.rejectWithValue(err.response.data);
                }
        }
);


// verify Account
export const verifyAccountAsync = createAsyncThunk("auth/verifyAccount",
        async (data, thunkAPI) => {
                try {
                        const response = await axios.post(`${domain}/api/auth/register/verifing-account/`, data);
                        return response.data;
                } catch (err) {
                        toast.error(`Email varifyed request failed`);
                        console.error(err.response.data);
                        return thunkAPI.rejectWithValue(err.response.data);
                }
        }
);

// login user
export const loginUserAsync = createAsyncThunk("auth/loginUser",
        async (userData, thunkAPI) => {
                try {
                        console.log(userData);
                        const response = await axios.post(`${domain}/api/auth/login-user/`, userData);

                        if (response.data) {
                                localStorage.setItem("user", JSON.stringify(response.data));
                                localStorage.setItem("token", JSON.stringify(response.data));
                        }
                        return response.data;
                } catch (err) {
                        toast.error(`Login failed`);
                        console.error(err.response.data);
                        return thunkAPI.rejectWithValue(err.response.data);
                }
        }
);

// logout user
export const logOutUserAsync = createAsyncThunk("auth/logOutUser",
        async (_, thunkAPI) => {
                try {
                        const response = await axios.post(`${domain}/api/auth/logout/`);
                        if (response.data) {
                                localStorage.removeItem("user");
                                localStorage.removeItem("token");
                        }
                        return response.data;
                } catch (err) {
                        toast.error(`Logout failed`);
                        console.error(err.response.data);
                        return thunkAPI.rejectWithValue(err.response.data);
                }
        }
);

// forgot password
export const forgotPasswordRequestAsync = createAsyncThunk("auth/forgotPassword",
        async (data, thunkAPI) => {
                try {
                        const response = await axios.post(`${domain}/api/auth/new-password-request/`, data);
                        return response.data;
                } catch (err) {
                        toast.error(`Forgot password request failed`);
                        console.error(err.response.data);
                        return thunkAPI.rejectWithValue(err.response.data);
                }
        }
);

// reset password
export const changePasswordAsync = createAsyncThunk("auth/changePassword",
        async (data, thunkAPI) => {
                try {
                        const response = await axios.put(`${domain}/api/auth/reset-password/<str:uidb64>/<str:token>/`, data);
                        return response.data;
                } catch (err) {
                        toast.error(`Password change failed`);
                        console.error(err.response.data);
                        return thunkAPI.rejectWithValue(err.response.data);
                }
        }
);

