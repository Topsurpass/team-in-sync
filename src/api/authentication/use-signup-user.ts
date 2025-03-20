import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { HTTP } from "@/lib/http-client";

type RequestPayload = {
	email: string;
	password: string;
	fullName: string;
};

export default function useSignupUser() {
	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await HTTP.post("/api/v1/user/signup", requestPayload);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		onSuccess: (_res) => {
			toast.success("You're In. Let's Go!", {
				description: "Your account is ready. Dive in and complete your profile",
			});
		},
		onError: (err: any) => {
			toast.error("Signup failed", { description: err?.response?.data?.message });
		},
	});
}
