import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { HTTP } from "@/lib/http-client";
import { setAuthTokenHTTP } from "@/lib/set-auth-token";
import useAuthStore from "@/stores/user-store";

type RequestPayload = {
	email: string;
	password: string;
};

export interface ILogin {
	access_token: string;
	token_type: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	id: number;
	firstname: string;
	email: string;
	mobile: string;
	lastname: string;
	username: string;
	roles: string[];
	authorities: string[];
	jti: string;
}

const useLoginUser = () => {
	const queryClient = useQueryClient();
	const addUserToStore = useAuthStore((state) => state.setUser);
	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await HTTP.post("/api/v1/user/login", requestPayload);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		onSuccess: (res) => {
			const { token, ...rest } = (res.data as any).data;
			setAuthTokenHTTP(token);
			const decodedToken = jwtDecode(token);
			addUserToStore({
				token,
				...rest,
				...decodedToken,
			} as any);
			queryClient.invalidateQueries();
		},
		onError: (err: any) => {
			toast.error("Login failed", { description: err?.response?.data?.message });
		},
	});
};

export default useLoginUser;
