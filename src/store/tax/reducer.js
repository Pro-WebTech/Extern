import { GET_TAX, GET_TAX_SUCCESS } from "./actionTypes";

const initialState = {
    tax : []
}

const tax = (state = initialState, action) => {
    switch (action.type){
        case GET_TAX:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_TAX_SUCCESS:
            // console.log("----------reducer cnae ----", action.payload.payload.result);
            state = {
                ...state,
                tax: action.payload.payload.result[0]
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default tax;