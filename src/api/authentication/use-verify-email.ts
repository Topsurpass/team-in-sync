import { useQuery } from "@tanstack/react-query";
import AuthHTTP from "@/lib/http-client";
import QueryKeys from "../query-keys";

const url = `/api/v1/users/verify-email`;

export const getVerifiedEmail = async (token: string | number | undefined) => {
	try {
		const res = await AuthHTTP.get(`${url}/${token}`);
		return (res?.data as any)?.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default function useGetVerifiedEmailById({
	token,
}: {
	token: string | number | undefined;
}) {
	return useQuery({
		queryKey: [QueryKeys.GET_VERIFIED_EMAILS, token],
		queryFn: () => getVerifiedEmail(token),
	});
}
