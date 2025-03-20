import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import config from "@/@config";
import useAuthStore from "@/stores/user-store";

export const HTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
});

const AuthHTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
});

export const refreshAccessToken = async () => {
	const addUserToStore = useAuthStore.getState().setUser;
	const logout = useAuthStore.getState().reset;
	try {
		const { accessToken } = useAuthStore.getState();
		const res = await HTTP.post("/api/v1/user/refresh", {
			refreshToken: accessToken,
		});
		const { token, ...rest } = (res.data as any).data;
		const decodedToken = jwtDecode(token);
		addUserToStore({
			token,
			...rest,
			...decodedToken,
		} as any);
		return token;
	} catch (err: any) {
		logout();
		toast.error(err?.response?.data?.error);
		return Promise.reject(err);
	}
};

AuthHTTP.interceptors.request.use(
	async (setting: any) => {
		const token = useAuthStore.getState().accessToken;
		if (token !== null && token !== undefined && token) {
			setting.headers.Authorization = `Bearer ${token}`;
			return setting;
		}
		return setting;
	},
	(err: any) => {
		return Promise.reject(err);
	}
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
				const token = await refreshAccessToken();
				originalRequest.headers.Authorization = `Bearer ${token}`;
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
