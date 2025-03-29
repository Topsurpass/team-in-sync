import { useQuery } from "@tanstack/react-query";
import AuthHTTP from "@/lib/http-client";
import QueryKeys from "@/api/query-keys";

interface IParameters {
	[key: string]: any;
}

const url = `/api/v1/users/roles/`;

export const getRoles = async (requestParams: IParameters = {}) => {
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

export default function useGetRoles(requestParams: IParameters = {}) {
	return useQuery({
		queryKey: [QueryKeys.GET_ROLES, requestParams],
		queryFn: () => getRoles(requestParams),
	});
}
