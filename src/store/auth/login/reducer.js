import { CHECK_LOGIN, LOGIN_USER_SUCCESSFUL, API_ERROR, LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGIN_USER_FAIL } from './actionTypes';

const initialState = {
    loginError: "", message: null, loading: false, jwt:""
}

const login = (state = initialState, action) => {
    // console.log("-------reducer------", action);
    switch (action.type) {
        case CHECK_LOGIN:
            // console.log("Reducer in Login");
            state = {
                ...state,
                loading: true
            }
            break;
        case LOGIN_USER_SUCCESSFUL:

            state = {
                ...state,
                jwt: action.token,
                refreshToken: action.refreshToken,
                loading: false
            }
            break;
        case LOGIN_USER_FAIL:
            state = {
                ...state,
                loginError: action.payload
            }
            break;
        case LOGOUT_USER:
            state = { ...state };
            break;

        case LOGOUT_USER_SUCCESS:
            state = { ...state };
            break;

        case API_ERROR:
            state = {
                ...state,
                loading: false,
                loginError: action.payload
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;
