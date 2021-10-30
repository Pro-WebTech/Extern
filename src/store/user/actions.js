import { ABOUT_ME, ABOUT_ME_SUCCESS, API_ERROR, GET_MENU_USER, GET_MENU_USER_SUCCESS} from "./actionTypes";

export const aboutMe = () =>{
    return {
        type: ABOUT_ME,
        payload: {}
    }
}

export const aboutMeSucess = (result) =>{
    return {
        type: ABOUT_ME_SUCCESS,
        payload: result.result
    }
}

export const getMenuUser = () =>{
    
    return{
        type:GET_MENU_USER,
        payload:{}
    }
}

export const getMenuUserSuccess = (result) =>{
    const menus = result.result[0][0];
    return {
        type: GET_MENU_USER_SUCCESS,
        payload: menus
    }
}   

export const apiError = (error) => {
    return {
        type: API_ERROR,
        payload: error
    }
}