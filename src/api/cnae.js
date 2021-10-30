import axios from 'axios';

const getCnaeApi = (url, token) =>{
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

export { getCnaeApi };