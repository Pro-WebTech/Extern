import axios from 'axios';

const getAuditoryApi = ( url , token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.get(url, config).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

const getAuditoryDetailApi = (url, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.get(url, config).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

const uploadFileApi = (url, token, formdata) =>{
    const config = {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
        }
    }
    return axios.post(url, formdata, config).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

const createAuditApi = (url, token, data) =>{
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.post(url, data.payload.company, config).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}
export { getAuditoryApi, uploadFileApi, createAuditApi, getAuditoryDetailApi}