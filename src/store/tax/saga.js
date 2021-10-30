import {takeEvery, fork, put, all, call} from 'redux-saga/effects';

import {apiError} from '../user/actions';
import {getTaxApi} from '../../api/tax';
import {getTaxSuccess} from './actions';
import {GET_TAX} from './actionTypes';
import ApiUrl from "../../constants/ApiUrl";

function* getTaxFunction() {
    const token = localStorage.getItem("authUser");
    try {
        const response = yield call(getTaxApi, ApiUrl.REGIME_TRIBUTARIO, token);
        yield put(getTaxSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchGetTax() {
    yield takeEvery(GET_TAX, getTaxFunction);
}

function* taxSaga() {
    yield all([
        fork(watchGetTax),
    ])
}

export default taxSaga;
