import axios from 'axios';
import API_URL from "../constants/ApiUrl";

const getAuditoriaDetail = (id) => {
    const token = localStorage.getItem("authUser");
    const url = API_URL.AUDITORIAS + "/" + id;
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.get(url, config);
}
const uploadFileApi = (formdata) => {
    const token = localStorage.getItem("authUser");
    const url = API_URL.FILEUPLOAD;
    const config = {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
        }
    }
    return axios.post(url, formdata, config);
}

const createAuditApi = (data) => {
    const token = localStorage.getItem("authUser");
    const url = API_URL.AUDITORIAS;

    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.post(url, data, config);
}

const createLiminares = (data) => {
    const token = localStorage.getItem("authUser");
    const url = API_URL.LIMINARE;

    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.post(url, data, config);
}

export {getAuditoriaDetail, uploadFileApi, createAuditApi, createLiminares}
