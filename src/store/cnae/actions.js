import { GET_CNAE_SUCCESS, GET_CNAE } from "./actionTypes";

export const getCnae = () => {
    return {
        type: GET_CNAE,
        payload: {}
    }
}

export const getCnaeSuccess = (payload) => {
    return {
        type: GET_CNAE_SUCCESS,
        payload: {payload}
    }
}