import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { GET_CNAE } from './actionTypes';
import { apiError } from '../user/actions';
import { getCnaeApi } from '../../api/cnae';
import {getCnaeSuccess} from './actions';

import API_URL from "../../constants/ApiUrl";
require('dotenv').config()

function* getCnaeFunction(){
    const token = localStorage.getItem("authUser");
    try{
        const response = yield call (getCnaeApi, API_URL.CNAE, token);
        yield put(getCnaeSuccess(response));
    }catch(error){
        yield put (apiError(error));
    }
}

export function* watchGetCane(){
    yield takeEvery(GET_CNAE, getCnaeFunction);
}

function* cnaeSaga(){
    yield all([
        fork(watchGetCane)
    ])
}

export default cnaeSaga;