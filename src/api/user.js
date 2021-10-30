import axios from 'axios';

const postAboutMe = (url, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const bodyParameters = {
        key: "value"
     };
    return axios.post(url, bodyParameters, config).then(response => {
        if (response.status === 400 || response.status === 500) {
            window.location.href = `/login`;
            throw response.data;
        }
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

const getMenuUserApi = (url, token) =>{
    
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
export { postAboutMe, getMenuUserApi }