import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';

import User from './user/reducer';
import Company from './company/reducer';
import Auditory from './auditorias/reducers';
import State from './state/reducer';
import City from './city/reducer';
import Cnae from './cnae/reducer';
import Tax from './tax/reducer';
const rootReducer = combineReducers({

    // public
    Layout,

    // Authentication
    Account,
    Login,
    Forget,

    User,
    Company,
    Auditory,
    State,
    City,
    Cnae,
    Tax

});

export default rootReducer;