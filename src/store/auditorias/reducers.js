import { CREATE_AUDITORY, CREATE_AUDITORY_SUCCESS, GET_AUDITORY, GET_AUDITORY_DETAIL, GET_AUDITORY_DETAIL_SUCCESS, 
    GET_AUDITORY_SUCCESS, UPLOAD_FILE, UPLOAD_FILE_SUCCESS } from "./actionTypes"
import Constants from '../../constants/Constants';

const initialState = {
    auditorias : [], upload_type:"", upload_other_compatible_files:[], upload_periodoReferenciaInicial:[], upload_path:[],
    message:"", auditoryDetail:[], upload_file_status: Constants.Status.NONE
}

const auditory = (state = initialState, action) => {
    switch (action.type){
        case GET_AUDITORY:
            state = {
                ...state,
                loading : true
            }
            break;
        case GET_AUDITORY_SUCCESS:
            
            state = {
                ...state,
                auditorias: action.payload.payload.result
            }
            break;

        case GET_AUDITORY_DETAIL:
            state = {
                ...state,
                loading : true
            }
            break;
        
        case GET_AUDITORY_DETAIL_SUCCESS:
            state = {
                ...state,
                auditoryDetail: action.payload.payload.result
            }
            break;
        case CREATE_AUDITORY:
            state = {
                ...state,
                loading : true
            }
            break;
        case CREATE_AUDITORY_SUCCESS:
            state = {
                ...state,
                message: action.payload
            }
            break;
        case UPLOAD_FILE:
            state = {
                ...state,
                upload_file_status: Constants.Status.REQUEST,
                loading:true
            }
            break;
        case UPLOAD_FILE_SUCCESS:
            state = {
                ...state,
                upload_type:action.payload.type,
                upload_other_compatible_types: action.payload.other_compatible_files,
                upload_periodoReferenciaInicial: action.payload.periodoReferenciaInicial,
                upload_path: action.payload.path,
                upload_file_status: Constants.Status.SUCCESS
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default auditory;