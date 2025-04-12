// import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import AuthHTTP from "@/lib/http-client";

type RequestPayload = {
	title: string;
	description: string;
	staus?: string;
	roles: {
		role: any;
		number_required: number;
		skill_ids: number[];
	}[];
};

export default function useProject() {
	// const navigate = useNavigate();
	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await AuthHTTP.post(
					"/api/v1/projects/projects/",
					requestPayload
				);
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
			// navigate("/login");
		},
		onError: (err: any) => {
			// console.log(err);
			toast.error("Failed", {
				description: err?.response?.data?.errors?.email,
			});
		},
	});
}
