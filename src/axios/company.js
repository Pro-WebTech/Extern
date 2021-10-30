import axios from 'axios';
import API_URL from "../constants/ApiUrl";

const getCompanyDetail = (id) => {
    const token = localStorage.getItem("authUser");
    const url = API_URL.COMPANIES + "/" + id;
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.get(url, config);
}
export {getCompanyDetail}
