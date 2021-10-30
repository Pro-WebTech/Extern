import { GET_CNAE_SUCCESS, GET_CNAE } from "./actionTypes";

const initialState = {
    cnaes : []
}

const cnae = ( state = initialState, action) => {
    switch (action.type){
        case GET_CNAE:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_CNAE_SUCCESS:
            state = {
                ...state,
                cnaes: action.payload.payload.result[0]
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default cnae;