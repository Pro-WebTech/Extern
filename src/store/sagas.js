import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';

import userSaga from './user/saga';
import companySaga from './company/saga';
import auditorySaga from './auditorias/sagas';
import stateSaga from './state/saga';
import citySaga from './city/saga';
import cnaeSaga from './cnae/saga';
import taxSaga from './tax/saga';
export default function* rootSaga() {
    yield all([
        
        //public
        accountSaga(),
        loginSaga(),
        forgetSaga(),
        LayoutSaga(),

        userSaga(),
        companySaga(),
        auditorySaga(),
        stateSaga(),
        citySaga(),
        cnaeSaga(),
        taxSaga()
    ])
}