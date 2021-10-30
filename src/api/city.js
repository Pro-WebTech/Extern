import axios from 'axios';

const getCityApi = (url, token) =>{
    console.log("---------------------");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        },
        params: {
            _limit: 10
        },
        // maxContentLength: Infinity,
        // maxBodyLength: Infinity
    }
    return axios.get(url, config,).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}

export { getCityApi };