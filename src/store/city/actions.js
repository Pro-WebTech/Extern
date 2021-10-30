import { GET_CITY, GET_CITY_SUCCESS } from "./actionTypes";

export const getCity = (id) =>{
    console.log("id: ", id);
    return {
        type: GET_CITY,
        payload: {id}
    }
}

export const getCitySuccess = (payload) => {
    return {
        type: GET_CITY_SUCCESS,
        payload: {payload}
    }
}