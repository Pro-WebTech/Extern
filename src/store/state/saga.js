import {takeEvery, fork, put, all, call} from 'redux-saga/effects';

import {GET_STATE} from './actionTypes';
import {apiError} from '../user/actions';
import {getStateApi} from '../../api/state';
import {getStateSuccess} from './actions';
import ApiUrl from "../../constants/ApiUrl";

function* getStateFunction() {
    const token = localStorage.getItem("authUser");
    try {
        const response = yield call(getStateApi, ApiUrl.STATE, token);
        console.log("-------state saga-------", response);
        yield put(getStateSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchGetState() {
    yield takeEvery(GET_STATE, getStateFunction)
}

function* stateSaga() {
    yield all([
        fork(watchGetState),
    ])
}

export default stateSaga;
