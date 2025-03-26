import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "@/@config";
import useAuthStore from "@/stores/user-store";
import { setAuthTokenHTTP } from "@/lib/set-auth-token";

export const HTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
});

const AuthHTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
});

const isTokenExpired = (token: string): boolean => {
	try {
		const decoded: any = jwtDecode(token);
		return decoded.exp * 1000 < Date.now();
	} catch {
		return true;
	}
};

export const refreshAccessToken = async () => {
	const { setUser, reset, refreshToken } = useAuthStore.getState();

	if (!refreshToken || isTokenExpired(refreshToken)) {
		reset();
		return Promise.reject("Session expired. Please log in again.");
	}

	try {
		const res = await HTTP.post("/api/v1/users/token/refresh/", {
			refresh: refreshToken,
		});
		const { access, refresh, ...rest } = (res.data as any).data;
		setAuthTokenHTTP(access);

		const decodedToken = jwtDecode(access);

		setUser({
			access,
			refresh,
			...rest,
			...decodedToken,
		} as any);

		return access;
	} catch (err: any) {
		reset();
		return Promise.reject(err?.response?.data?.message || "Session expired.");
	}
};

AuthHTTP.interceptors.request.use(
	async (request: any) => {
		const { accessToken } = useAuthStore.getState();

		if (accessToken && !isTokenExpired(accessToken)) {
			request.headers.Authorization = `Bearer ${accessToken}`;
		}
		return request;
	},
	(err: any) => Promise.reject(err)
);

AuthHTTP.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const logout = useAuthStore.getState().reset;
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			try {
				originalRequest._retry = true;
				const newToken = await refreshAccessToken();
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return await HTTP(originalRequest);
			} catch (refreshError) {
				logout();
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default AuthHTTP;
