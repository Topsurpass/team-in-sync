import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { HTTP } from "@/lib/http-client";

type RequestPayload = {
	email: string;
	password: string;
	// first_name: string;
	// last_name: string;
};

export default function useSignupUser() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await HTTP.post("/api/v1/users/register/", requestPayload);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		onSuccess: (res) => {
			const resData = res.data as any;
			toast.success("Signup successful!", {
				description: resData.message,
			});
			navigate("/login");
		},
		onError: (err: any) => {
			toast.error("Signup failed", {
				description: err?.response?.data?.errors?.email,
			});
		},
	});
}
