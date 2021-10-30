import { GET_CITY, GET_CITY_SUCCESS } from "./actionTypes";

const initialState = {
    cities : []
}

const city = (state = initialState, action) => {
    switch (action.type){
        case GET_CITY:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_CITY_SUCCESS:
            state = {
                ...state,
                cities : action.payload.payload.result[0]
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default city;