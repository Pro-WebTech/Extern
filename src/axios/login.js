import axios from 'axios';
import API_URL from "../constants/ApiUrl";

export const postForgetPwd = (email) => {
    const url = `${API_URL.FORGET_PASSWORD}`
    const data = {
        email: email
    }
    return axios.post(url, data);
}

export const postAboutMe = () => {
    const url = `${API_URL.ABOUT_ME}`
    const token = localStorage.getItem("authUser");

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const bodyParameters = {
        key: "value"
     };
    return axios.post(url, bodyParameters, config);
}


export const postChangeProfile = (name, currently_password, new_password, confirm_new_password) => {
    const url = `${API_URL.UPDATE_PROFILE}`
    const token = localStorage.getItem("authUser");

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const bodyParameters = {
        name: name,
        currently_password: currently_password, 
        new_password: new_password, 
        confirm_new_password: confirm_new_password
     };

    return axios.put(url, bodyParameters, config);
}
