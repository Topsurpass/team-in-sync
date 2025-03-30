import { createContext, useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/stores/user-store";
import { setAuthTokenHTTP } from "@/lib/set-auth-token";
import { HTTP } from "@/lib/http-client";

type GoogleAuthContextType = {
	handleSuccess: (_response: any) => Promise<void>;
	handleFailure: () => void;
};

const GoogleAuthContext = createContext<GoogleAuthContextType | null>(null);

export const useGoogleAuth = () => {
	const context = useContext(GoogleAuthContext);
	if (!context) {
		throw new Error("useGoogleAuth must be used within a GoogleAuthProvider");
	}
	return context;
};

type GoogleAuthProps = {
	children: React.ReactNode;
};

export default function GoogleAuth({ children }: GoogleAuthProps) {
	const addUserToStore = useAuthStore((state) => state.setUser);

	const handleSuccess = async (response: any) => {
		try {
			// Send the Google token to the backend
			const res = await HTTP.post("api/v1/users/google-oauth/", {
				token: response.credential,
			});
			const { access, ...rest } = (res.data as any).data;
			setAuthTokenHTTP(access);
			const decodedToken = jwtDecode(access);
			addUserToStore({
				access,
				...rest,
				...decodedToken,
			} as any);
		} catch (error) {
			toast.error("Google Authentication", {
				description: (error as any).message,
			});
			return Promise.reject(error);
		}
	};

	const handleFailure = () => {
		toast.error("Google Authentication", {
			description: "Please try again",
		});
	};

	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_SHW_CLIENT_ID}>
			<GoogleAuthContext.Provider value={{ handleSuccess, handleFailure }}>
				{children}
			</GoogleAuthContext.Provider>
		</GoogleOAuthProvider>
	);
}
