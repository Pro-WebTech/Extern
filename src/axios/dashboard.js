import axios from 'axios';
import API_URL from "../constants/ApiUrl";

const getDashBoardData = (user_id) => {
    const token = localStorage.getItem("authUser");
    const url = API_URL.DASHBOARD + "/" + user_id;
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    return axios.get(url, config);
}

export {getDashBoardData}
