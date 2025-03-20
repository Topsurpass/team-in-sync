import axios from "axios";
import AuthHTTP from "./http-client";

const setAuthToken = (token: string | boolean) => {
	if (token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common.Authorization;
	}
};

export const setAuthTokenHTTP = (token: string | boolean) => {
	if (token) {
		AuthHTTP.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete AuthHTTP.defaults.headers.common.Authorization;
	}
};

export default setAuthToken;
