import axios from 'axios';

const getCompanyDetailApi = (url, token) =>{
    const config = {
        headers: {
            Authorization: "Bearer " + token
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

const getCompanyApi = (url, token) =>{
    const config = {
        headers: {
            Authorization: "Bearer " + token
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

const createCompanyApi = (url, company, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    return axios.post(url, company, config).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

const updateCompanyApi = (url, company, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    return axios.put(url, company, config).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

const removeCompanyApi = (url, token) =>{
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    console.log(url);
    return axios.delete(url,  config).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}
export { getCompanyApi, createCompanyApi, removeCompanyApi, updateCompanyApi, getCompanyDetailApi }
