import { GET_STATE, GET_STATE_SUCCESS } from "./actionTypes";

const initialState = {
    states : []
}

const state = ( state = initialState, action) => {
    switch ( action.type){
        case GET_STATE:
            state = {
                ...state,
                loading :true
            }
            break;
        case GET_STATE_SUCCESS:
            state = {
                ...state,
                states: action.payload.payload.result[0]
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default state;