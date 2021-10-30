import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, LOGOUT_USER } from './actionTypes';
import { apiError, loginUserSuccessful, loginUserFail } from './actions';

// AUTH related methods
import { postLogin } from '../../../api/auth';
import API_URL from "../../../constants/ApiUrl";
require('dotenv').config()

function* loginUser({ payload: { user, history } }) {
    try {
        const data = {
            email: user.username,
            password: user.password
        }
        // console.log("---------saga------", data);
        const response = yield call (postLogin, API_URL.USER_SIGNIN, data);
        localStorage.setItem("authUser", response.token);
        localStorage.setItem("refreshTokenAuthUser", response.refreshToken);

        if ( response.token !== undefined){
            yield put(loginUserSuccessful(response));
            history.push('/dashboard');
        }
        else{
            yield put(loginUserFail("Invalid Username or Password"));
        }

    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        localStorage.removeItem("userID");
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* loginSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default loginSaga;
