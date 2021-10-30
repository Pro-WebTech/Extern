import { CHECK_LOGIN, LOGIN_USER_SUCCESSFUL, API_ERROR,LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGIN_USER_FAIL } from './actionTypes';

export const checkLogin = (user, history) => {
    // console.log("-------actions--------", user);
    return {
        type: CHECK_LOGIN,
        payload: { user, history }
    }
}

export const loginUserSuccessful = (token) => {
    console.log("token", token.token);
    return {
        type: LOGIN_USER_SUCCESSFUL,
        token: token
    }
}

export const loginUserFail = (message) =>{
    return{
        type: LOGIN_USER_FAIL,
        payload: message
    }
}

export const apiError = (error) => {
    return {
        type: API_ERROR,
        payload: error
    }
}

export const logoutUser = (history) => {
    return {
        type: LOGOUT_USER,
        payload: { history }
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {}
    }
}
