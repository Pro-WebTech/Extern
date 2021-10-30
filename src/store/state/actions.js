import { GET_STATE, GET_STATE_SUCCESS } from "./actionTypes";

export const getState = () =>{
    // 
    return {
        type:GET_STATE,
        payload: {}
    }
}

export const getStateSuccess = (payload) =>{
    return {
        type: GET_STATE_SUCCESS,
        payload: {payload}
    }
}