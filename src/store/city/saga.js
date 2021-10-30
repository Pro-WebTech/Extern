import { GET_CITY } from './actionTypes';
import { apiError } from '../user/actions';

import { getCityApi } from '../../api/city';
import { fork, takeEvery, put, all, call  } from '@redux-saga/core/effects';
import { getCitySuccess } from './actions';

import API_URL from "../../constants/ApiUrl";
require('dotenv').config()

function* getCityFunction(payload){
    const token = localStorage.getItem("authUser");
    const id = payload.payload.id;
    const url = API_URL.CITY +"/" +  id;
    try{
        const response = yield call (getCityApi, url, token);
        console.log("-------saga-------", response);
        yield put(getCitySuccess(response));
    }catch(error){
        yield put (apiError(error));
    }
}

export function* watchGetCity(){
    yield takeEvery(GET_CITY, getCityFunction);
}

function* citySaga(){
    yield all ([
        fork(watchGetCity),
    ])
}

export default citySaga;