import {
    CREATE_COMPANY,
    CREATE_COMPANY_SUCCESS,
    GET_DETAIL_COMPANY,
    GET_DETAIL_COMPANY_SUCCESS,
    GET_COMPANY,
    GET_COMPANY_SUCCESS,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY,
    DELETE_COMPANY_SUCCESS,
    DELETE_COMPANY,
    CLEAR_MESSGGE
} from "./actionTypes";

const initialState = {
    companies: [], message: ""
}

const company = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANY:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_DETAIL_COMPANY:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_DETAIL_COMPANY_SUCCESS:
            state = {
                ...state,
                companyDetail: action.payload.payload.result
            }
            break;
        case GET_COMPANY_SUCCESS:
            state = {
                ...state,
                companies: action.payload.payload.result
            }
            break;

        case CREATE_COMPANY:
            state = {
                ...state,
                loading: true
            }
            break;

        case CREATE_COMPANY_SUCCESS:
            state = {
                ...state,
                message: action.payload.payload.message
            }
            break;

        case DELETE_COMPANY:

            state = {
                ...state,
                loading: true,
                payload: action.payload
            }
            break;
        case DELETE_COMPANY_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,

            }
            break;
        case UPDATE_COMPANY:
            state = {
                ...state,
                loading: true
            }
            break;
        case UPDATE_COMPANY_SUCCESS:
            state = {
                ...state,
                message: action.payload.message
            }
            break;
        case CLEAR_MESSGGE:
            state = {
                ...state,
                message: "",
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default company;
