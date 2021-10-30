import {
    GET_COMPANY,
    GET_DETAIL_COMPANY,
    GET_DETAIL_COMPANY_SUCCESS,
    GET_COMPANY_SUCCESS,
    CREATE_COMPANY,
    CREATE_COMPANY_SUCCESS,
    UPDATE_COMPANY,
    UPDATE_COMPANY_SUCCESS,
    DELETE_COMPANY,
    DELETE_COMPANY_SUCCESS,
    CLEAR_MESSGGE
} from "./actionTypes";

export const getDetailCompany = (id) => {
    return {
        type: GET_DETAIL_COMPANY,
        id: {id}
    }
}
export const getDetailCompanySucess = (payload) => {
    return {
        type: GET_DETAIL_COMPANY_SUCCESS,
        payload: {payload}
    }
}

export const getCompany = () => {
    return {
        type: GET_COMPANY,
        payload: {}
    }
}

export const getCompanySuccess = (payload) => {
    return {
        type: GET_COMPANY_SUCCESS,
        payload: {payload}
    }
}

export const createCompany = (company, history) => {
    return {
        type: CREATE_COMPANY,
        payload: {company, history}
    }
}

export const createCompanySuccess = (payload, history) => {
    return {
        type: CREATE_COMPANY_SUCCESS,
        payload: {payload, history}
    }
}

export const updateCompany = (company_id, company, history) => {
    return {
        type: UPDATE_COMPANY,
        payload: {company_id, company, history}
    }
}

export const updateCompanySuccess = (payload) => {
    return {
        type: UPDATE_COMPANY_SUCCESS,
        payload: payload
    }
}

export const deleteCompany = (company_id, history) => {
    return {
        type: DELETE_COMPANY,
        payload: {company_id, history}
    }
}

export const deleteCompanySuccess = (payload) => {
    return {
        type: DELETE_COMPANY_SUCCESS,
        payload: payload
    }
}

export const clearMessage = () => {
    return {
        type: CLEAR_MESSGGE,
    }
}
