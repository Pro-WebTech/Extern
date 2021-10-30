import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";
import Profile from "../pages/Authentication/Profile";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Company
import FilterScreen from "../pages/Company/FilterScreen";
import CreateCompanyScreen from "../pages/Company/CreateCompanyScreen";
import FilterCompanyScreen from "../pages/Company/FilterCompanyScreen";
import EditCompanyScreen from "../pages/Company/EditCompanyScreen";
//Audit
import AuditFilterScreen from "../pages/Audit/AuditFilterScreen";
import NewAuditScreen from "../pages/Audit/NewAuditScreen";
import DetailAuditScreen from "../pages/Audit/DetailAuditScreen";

//Sample
import FormAdvanced from "../pages/Company/FormAdvanced";
const authProtectedRoutes = [

	{ path: "/dashboard", component: Dashboard},
	{ path: "/edit-profile", component: Profile},

	//Company
	{ path: "/filter", component:FilterScreen},
	{ path: "/create-company", component:CreateCompanyScreen },
	{ path: "/company-filter", component:FilterCompanyScreen},
	{ path: "/edit-company/:companyID",  component:EditCompanyScreen},
	//Audit
	{ path: "/audit-filter/:companyID", component:AuditFilterScreen},
	{ path: "/new-audit/:companyID", component:NewAuditScreen},
	{ path: "/detail-audit/:detailID", component:DetailAuditScreen},
	//Sample Form
	{ path: "/sample-form", component:FormAdvanced},
	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },
	{ path: "/auth-lock-screen", component: AuthLockScreen },

	// Authentication Inner
	// { path: "/auth-login", component: Login1 },
	// { path: "/auth-register", component: Register1 },
	// { path: "/auth-recoverpw", component: ForgetPwd1 },
];

export { authProtectedRoutes, publicRoutes };
