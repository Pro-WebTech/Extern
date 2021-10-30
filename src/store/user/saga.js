import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { ABOUT_ME, GET_MENU_USER } from './actionTypes';
import { aboutMeSucess, apiError, getMenuUserSuccess, getMenuUser } from './actions';

import { postAboutMe, getMenuUserApi } from '../../api/user';
import API_URL from "../../constants/ApiUrl";
require('dotenv').config()

function* aboutMe(){
    console.log("it is called");
    const token = localStorage.getItem("authUser");
    
    try{
        const response = yield call (postAboutMe, API_URL.ABOUT_ME, token);
        localStorage.setItem("userID", response.result[0].id);
        yield put(aboutMeSucess(response));
        yield put(getMenuUser());
    }catch(error){
        yield put (apiError(error));
    }
}

function* getMenuUserFunction(){
    const token = localStorage.getItem("authUser");
    const id = localStorage.getItem("userID");
    const url = API_URL.MENU_USER + id;
    try{
        const response = yield call ( getMenuUserApi, url, token);
        yield put(getMenuUserSuccess(response));
    }catch(error){
        yield put (apiError(error));
    }
} 
export function* watchAboutMe(){
    yield takeEvery(ABOUT_ME, aboutMe);
}
export function* watchGetMenuUser(){
    yield takeEvery(GET_MENU_USER, getMenuUserFunction);
}
function* userSaga(){
    yield all([
        fork(watchAboutMe),
        fork(watchGetMenuUser),
    ])
}

export default userSaga;