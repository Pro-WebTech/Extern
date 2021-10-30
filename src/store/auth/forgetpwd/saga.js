import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { FORGET_USER } from './actionTypes';
import { forgetUserSuccessful, userForgetPasswordError } from './actions';

// AUTH related methods
import { postForgetPwd } from '../../../helpers/fackBackend_Helper';
import { getFirebaseBackend } from "../../../helpers/firebase_helper";

//Initilize firebase
const fireBaseBackend = getFirebaseBackend();

//If user is login then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
        try {
            if(process.env.REACT_APP_DEFAULTAUTH === "firebase"){
                const response = yield call(fireBaseBackend.forgetPassword, user.useremail);
                if (response) {
                  yield put(
                    forgetUserSuccessful(
                      "Reset link are sended to your mailbox, check there first"
                    )
                  );
                }
            }else{
                const response = yield call(postForgetPwd, '/forget-pwd', {email: user.useremail});
                if (response) {
                    yield put(
                        forgetUserSuccessful(
                        "Reset link are sended to your mailbox, check there first"
                      )
                    );
                }
            }            
        } catch (error) {
            yield put(userForgetPasswordError(error));
        }
}

export function* watchUserForget() {
    yield takeEvery(FORGET_USER, forgetUser)
}

function* forgetSaga() {
    yield all([fork(watchUserForget)]);
}

export default forgetSaga;