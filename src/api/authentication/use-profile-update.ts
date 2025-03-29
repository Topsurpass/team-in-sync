import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import AuthHTTP from "@/lib/http-client";
import useAuthStore from "@/stores/user-store";

type RequestPayload = {
	role: string;
	bio: string;
	full_name: string;
	experience_level?: string;
	github_link?: string;
	linkedin_link?: string;
	skills: string[];
	profile_picture: string;
};

export default function useProfileUpdate() {
	const navigate = useNavigate();
	const store = useAuthStore((state) => state);
	const setIsProfileComplete = store.setIsProfileComplete;

	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			try {
				const res = await AuthHTTP.patch(
					"/api/v1/users/profile/",
					requestPayload
				);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		onSuccess: () => {
			setIsProfileComplete(true);
			navigate("/");
			toast.success(`Welcome!`, {
				description: "You are one step away from the next big thing!",
			});
		},

		onError: (err: any) => {
			toast.error("Profile update failed", {
				description: err?.message,
			});
		},
	});
}
