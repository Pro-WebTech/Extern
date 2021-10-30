// import userEvent from "@testing-library/user-event";
import { ABOUT_ME, API_ERROR, ABOUT_ME_SUCCESS, GET_MENU_USER, GET_MENU_USER_SUCCESS } from "./actionTypes";

const initialState = {
    useremail: "", username:"", menus:[], userid: 0,
}


const user = (state = initialState, action) => {
    switch (action.type) {
        case ABOUT_ME:
            state ={
                ...state,
                loading: true
            }
            break;
        case ABOUT_ME_SUCCESS:
            const data = action.payload[0]
            state ={
                ...state,
                useremail: data.email,
                username: data.name,
                userid: data.id
            }
            break;
        case GET_MENU_USER:
            state = {
                ...state,
                loading:true
            }
            break;
        case GET_MENU_USER_SUCCESS:
            state = {
                ...state,
                menus: action.payload
            }
            break;
        case API_ERROR:
            state = {
                ...state,
                loading: false,
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default user;