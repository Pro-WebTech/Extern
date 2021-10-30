import {takeEvery, fork, put, all, call} from 'redux-saga/effects';

import {CREATE_COMPANY, DELETE_COMPANY, GET_COMPANY, UPDATE_COMPANY, GET_DETAIL_COMPANY} from "./actionTypes";

import {
    getCompany,
    createCompanySuccess,
    deleteCompanySuccess,
    updateCompanySuccess,
    getCompanySuccess,
    getDetailCompanySucess
} from './actions';
import {apiError} from '../user/actions';
import {
    getCompanyApi,
    getCompanyDetailApi,
    createCompanyApi,
    removeCompanyApi,
    updateCompanyApi
} from '../../api/company';

import API_URL from "../../constants/ApiUrl";

require('dotenv').config()

function* getCompanyDetailFunction(payload) {
    const token = localStorage.getItem("authUser");
    const url = API_URL.COMPANIES + "/" + payload.id.id;
    try {
        const response = yield call(getCompanyDetailApi, url, token);
        yield put(getDetailCompanySucess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* getCompanyFunction() {
    const token = localStorage.getItem("authUser");
    try {
        const response = yield call(getCompanyApi, API_URL.COMPANIES, token);
        yield put(getCompanySuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* createCompanyFunction({payload: {company, history}}) {
    const data = {
        "cnpj": company.cnpj,
        "razao_social": company.razao_social,
        "nome_fantasia": company.nome,

        "endereco": company.endereco,
        "complemento": company.complemento,
        "bairro": company.bairro,
        "cep": company.cep,
        "email": company.email,
        "substituto_tributario": true,

        "state_id": company.state,
        "city_id": company.city,
        "cnae_id": company.cnae,
        "status": "ACTIVE",
        "cnaes": company.cnaes,
        "regime_tributarios": company.regime_tributarios
    }
    const token = localStorage.getItem("authUser");
    try {
        const response = yield call(createCompanyApi, API_URL.COMPANIES, data, token);
        history.push('/filter');
        yield put(createCompanySuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
    //const token
}

function* updateCompanyFunction({payload: {company_id, company, history}}) {
    const data = {
        "cnpj": company.cnpj,
        "razao_social": company.razao_social,
        "nome_fantasia": company.nome,

        "endereco": company.endereco,
        "complemento": company.complemento,
        "bairro": company.bairro,
        "cep": company.cep,
        "email": company.email,
        "substituto_tributario": true,

        "state_id": company.state,
        "city_id": company.city,
        "cnae_id": company.cnae,
        "status": "ACTIVE",
        "cnaes": company.cnaes,
        "regime_tributarios": company.regime_tributarios
    }
    const token = localStorage.getItem("authUser");
    const url = API_URL.COMPANIES + "/" + company_id;
    try {
        const response = yield call(updateCompanyApi, url, data, token);
        console.log("--------company saga------", response);
        yield put(updateCompanySuccess(response));
        history.push('/filter');
    } catch (error) {
        yield put(apiError(error));
    }
}

function* removeCompanyFunction({payload: {company_id, history}}) {
    const token = localStorage.getItem("authUser");
    // console.log("-----------saga -------", company_id);
    const url = API_URL.COMPANIES + "/" + company_id;
    try {
        const response = yield call(removeCompanyApi, url, token);
        // console.log("-------saga  response-----", response);
        yield put(deleteCompanySuccess(response));
        history.push('/filter');
        yield put(getCompany);
    } catch (error) {
        yield put(apiError(error));
    }
}

// function* clearMessageFunction(){
//     try
// }
export function* watchGetCompanyDetail() {
    yield takeEvery(GET_DETAIL_COMPANY, getCompanyDetailFunction);
}

export function* watchGetCompany() {
    yield takeEvery(GET_COMPANY, getCompanyFunction);
}

export function* watchCreateCompany() {
    yield takeEvery(CREATE_COMPANY, createCompanyFunction);
}

export function* watchUpdateCompany() {
    yield takeEvery(UPDATE_COMPANY, updateCompanyFunction);
}

export function* watchDeleteCompany() {
    yield takeEvery(DELETE_COMPANY, removeCompanyFunction);
}

function* companySaga() {
    yield all([
        fork(watchGetCompany),
        fork(watchGetCompanyDetail),
        fork(watchCreateCompany),
        fork(watchUpdateCompany),
        fork(watchDeleteCompany)
    ])
}

export default companySaga;
