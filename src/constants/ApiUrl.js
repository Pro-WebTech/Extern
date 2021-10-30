import Constants from './Constants';


const ApiUrl = {
    UPDATE_PROFILE: `${Constants.SERVER_URL}/api/v1/update_profile`.replace("/undefined", ""),
    FORGET_PASSWORD: `${Constants.SERVER_URL}/api/v1/forget_password`.replace("/undefined", ""),
    REFRESH: `${Constants.SERVER_URL}/api/v1/refresh`.replace("/undefined", ""),
    USER_SIGNIN: `${Constants.SERVER_URL}/api/v1/login`.replace("/undefined", ""),
    ABOUT_ME: `${Constants.SERVER_URL}/api/v1/me`.replace("/undefined", ""),
    MENU_USER: `${Constants.SERVER_URL}/api/v1/menus/user/`.replace("/undefined", ""),
    COMPANIES: `${Constants.SERVER_URL}/api/v1/companies`.replace("/undefined", ""),
    CNAE: `${Constants.SERVER_URL}/api/v1/cnae`.replace("/undefined", ""),
    CITY: `${Constants.SERVER_URL}/api/v1/city`.replace("/undefined", ""),
    AUDITORIAS: `${Constants.SERVER_URL}/api/v1/auditorias`.replace("/undefined", ""),
    LIMINARE: `${Constants.SERVER_URL}/api/v1/auditoria_liminars`.replace("/undefined", ""),
    FILEUPLOAD: `${Constants.SERVER_URL}/api/v1/auditoria/upload`.replace("/undefined", ""),
    REGIME_TRIBUTARIO: `${Constants.SERVER_URL}/api/v1/regime_tributario`.replace("/undefined", ""),
    STATE: `${Constants.SERVER_URL}/api/v1/state`.replace("/undefined", ""),
    DASHBOARD: `${Constants.SERVER_URL}/api/v1/dashboard`.replace("/undefined", ""),
}

export default ApiUrl;
