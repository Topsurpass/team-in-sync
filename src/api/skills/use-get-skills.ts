import { useQuery } from "@tanstack/react-query";
import AuthHTTP from "@/lib/http-client";
import QueryKeys from "@/api/query-keys";

interface IParameters {
	[key: string]: any;
}

const url = `/api/v1/users/skills/`;

export const getSkills = async (requestParams: IParameters = {}) => {
	try {
		const res = await AuthHTTP.get(url, {
			params: {
				...requestParams,
			},
		});
		return res?.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default function useGetSkills(role?: string) {
	return useQuery({
		queryKey: [QueryKeys.GET_SKILLS, role],
		queryFn: () => getSkills(role ? { role } : {}),
		// enabled: !!role,
	});
}
