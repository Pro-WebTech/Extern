import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { createAuditApi, getAuditoryApi, getAuditoryDetailApi, uploadFileApi } from '../../api/auditory';
import { apiError } from '../user/actions';
import { CREATE_AUDITORY, DELETE_AUDITORY, GET_AUDITORY, GET_AUDITORY_DETAIL, UPDATE_AUDITORY, UPLOAD_FILE } from './actionTypes';

import API_URL from "../../constants/ApiUrl";
import { getAuditorySuccess, uploadFileSuccess, getAuditoryDetailSuccess } from './actions';
require('dotenv').config()

function* getAuditoryFunction (payload) {
    const token = localStorage.getItem("authUser");
    const url = API_URL.AUDITORIAS + "?company_id=" + payload.id.id;
    try{
        const response = yield call (getAuditoryApi, url , token);
        yield put(getAuditorySuccess(response));
    }catch(error){
        yield put (apiError(error));
    }
}

function* getAuditoryDetailFunction(payload ) {
    const token = localStorage.getItem("authUser");
    const url = API_URL.AUDITORIAS + "/" + payload.id.id;
    try{
        const response = yield call (getAuditoryDetailApi, url , token);
        yield put(getAuditoryDetailSuccess(response));
    }catch(error){
        yield put (apiError(error));
    }
}
function* updateAuditoryFunction(){

}

function* deleteAuditoryFuncion(){

}

function* createAuditoryFunction(company, history){
    const token = localStorage.getItem("authUser");
    try{
        const response = yield call (createAuditApi, API_URL.AUDITORIAS, token, company);
        yield put(getAuditorySuccess(response));
    }catch(error){
        yield put (apiError(error));
    }
}

function* uploadFileFunction(file){
    const token = localStorage.getItem("authUser");
    try{
        const response = yield call (uploadFileApi, API_URL.FILEUPLOAD, token, file.file);
        if (response.message ==="File uploaded successfully."){
            yield put(uploadFileSuccess(response));
        }
        
    }catch(error){
        yield put (apiError(error));
    }
}

export function* watchGETAUditoryDetail() {
    yield takeEvery (GET_AUDITORY_DETAIL, getAuditoryDetailFunction);
}
export function* watchGetAuditory() {
    yield takeEvery(GET_AUDITORY, getAuditoryFunction);
}

export function* watchUpdateAuditory() {
    yield takeEvery(UPDATE_AUDITORY, updateAuditoryFunction);
}

export function* watchDeleteAuditory() {
    yield takeEvery(DELETE_AUDITORY, deleteAuditoryFuncion);
}

export function* watchUploadFileFunction(){
    yield takeEvery(UPLOAD_FILE, uploadFileFunction);
}
export function* watchCreateAuditory(){
    yield takeEvery(CREATE_AUDITORY, createAuditoryFunction);
}
function* auditorySaga(){
    yield all([
        fork(watchGetAuditory),
        fork(watchUpdateAuditory),
        fork(watchDeleteAuditory),
        fork(watchCreateAuditory),
        fork(watchUploadFileFunction),
        fork(watchGETAUditoryDetail)
    ])
}

export default auditorySaga;