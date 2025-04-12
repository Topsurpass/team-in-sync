import { useMutation } from "@tanstack/react-query";
import AuthHTTP from "@/lib/http-client";

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
	});
}
