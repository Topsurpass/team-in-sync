import { useNavigate } from "react-router-dom";
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

const useLoginUser = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const addUserToStore = useAuthStore((state) => state.setUser);
	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await HTTP.post("/api/v1/users/login/", requestPayload);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		onSuccess: (res) => {
			const { access, ...rest } = (res.data as any).data;
			setAuthTokenHTTP(access);
			const decodedToken = jwtDecode(access);
			addUserToStore({
				access,
				...rest,
				...decodedToken,
			} as any);
			queryClient.invalidateQueries();
			navigate("/");
		},
		onError: (err: any) => {
			toast.error("Login failed", { description: err?.response?.data?.message });
		},
	});
};

export default useLoginUser;
