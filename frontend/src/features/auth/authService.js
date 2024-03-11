import axios from "axios";
import { domain } from "../../env";


// user registration
export const registerUser = async (userData) => {
    console.log(userData);
    const response = await axios.post(`${domain}/api/auth/register-user/`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};


// verify Account
export const verifyAccount = async (data) => {
        const response = await axios.post(`${domain}/api/auth/register/verifing-account/`, data);
        return response.data;
};

// login user
export const loginUser = async (userData) => {
        console.log(userData);
        const response = await axios.post(`${domain}/api/auth/login-user`, userData);

        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
};

// logout user
export const logOutUser = async (_) => {
        const response = await axios.post(`${domain}/api/auth/logout/`);
        if (response.data) {
            localStorage.removeItem("user");
        }
        return response.data;
};

// forgot password
export const forgotPasswordRequest = async (data) => {
        const response = await axios.post(`${domain}/api/auth/new-password-request/`, data);
        return response.data;
};

// reset password
export const changePassword = async (data) => {
        const response = await axios.put(`${domain}/api/auth/reset-password/<str:uidb64>/<str:token>/`, data);
        return response.data;
};

