import { GET_TAX, GET_TAX_SUCCESS } from "./actionTypes";

export const getTax = () =>{
    return {
        type: GET_TAX,
        payload: {}
    }
}

export const getTaxSuccess = (payload) =>{
    return {
        type: GET_TAX_SUCCESS,
        payload: {payload}
    }
}