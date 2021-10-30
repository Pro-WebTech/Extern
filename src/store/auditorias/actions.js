import { GET_AUDITORY_SUCCESS, GET_AUDITORY, CREATE_AUDITORY, CREATE_AUDITORY_SUCCESS, UPDATE_AUDITORY, 
    UPDATE_AUDITORY_SUCCESS, DELETE_AUDITORY, DELETE_AUDITORY_SUCCESS, UPLOAD_FILE, UPLOAD_FILE_SUCCESS, 
    GET_AUDITORY_DETAIL, GET_AUDITORY_DETAIL_SUCCESS } from "./actionTypes"
export const getAuditory = (id) => {
    return {
        type: GET_AUDITORY,
        id: {id}
    }
}

export const getAuditorySuccess = (payload) => { 
    return {
        type: GET_AUDITORY_SUCCESS,
        payload: {payload}
    }
}

export const getAuditoryDetail = (id) => {
    return{
        type: GET_AUDITORY_DETAIL,
        id: {id}
    }
}

export const getAuditoryDetailSuccess = (payload) =>{
    return {
        type: GET_AUDITORY_DETAIL_SUCCESS,
        payload: {payload}
    }
}

export const createAuditory = (company, history ) => {
   
    return {
        type: CREATE_AUDITORY,
        payload: {company, history}
    }
}

export const creatAuditorySuccess = () => {
    return {
        type: CREATE_AUDITORY_SUCCESS,
        payload: {}
    }
}

export const updateAuditory = () =>{
    return {
        type: UPDATE_AUDITORY,
        
    }
}

export const updateAuditorySuccess = () =>{
    return {
        type: UPDATE_AUDITORY_SUCCESS,
    }
}

export const deleteAuditory = () => {
    return {
        type: DELETE_AUDITORY,
        loading:true
    }
}

export const deleteAuditorySuccess = () =>{
    return {
        type: DELETE_AUDITORY_SUCCESS,
        
    }
}

export const uploadFile= (file) => {
    return {
        type: UPLOAD_FILE,
        file: file
    }
}

export const uploadFileSuccess = (payload) =>{
    return {
        type: UPLOAD_FILE_SUCCESS,
        payload:payload.result[0]
    }
}