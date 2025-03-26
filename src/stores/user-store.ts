import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import setAuthToken, { setAuthTokenHTTP } from "@/lib/set-auth-token";

type TState = {
	id: string;
	expiresIn: number;
	accessToken: string;
	refreshToken: string;
	firstname: string;
	lastname: string;
	email: string;
	is_profile_complete: boolean;
	is_verified: boolean;
	isAuthenticated: boolean;
	userStatus: string;
};

type TAction = {
	setUser: (_payload: any) => void;
	reset: () => void;
	setIsProfileComplete: (_value: boolean) => void;
};

// define the initial state
const initialState: TState = {
	id: "",
	expiresIn: 0,
	accessToken: "",
	refreshToken: "",
	firstname: "",
	lastname: "",
	email: "",
	isAuthenticated: false,
	userStatus: "",
	is_profile_complete: false,
	is_verified: false,
};

const useAuthStore = create<TState & TAction>()(
	immer(
		devtools(
			persist(
				(set) => ({
					...initialState,
					setUser: (payload) =>
						set((state) => {
							state.expiresIn = payload.exp;
							state.accessToken = payload.access;
							state.refreshToken = payload.refresh;
							state.email = payload.email;
							state.firstname = payload.first_name;
							state.lastname = payload.last_name;
							state.userStatus = payload.is_active;
							state.is_profile_complete = payload.is_profile_complete;
							state.is_verified = payload.is_verified;
							state.isAuthenticated = true;
							state.id = payload.user_id;
						}),
					reset: () => {
						set(initialState);
						setAuthToken(false);
						setAuthTokenHTTP(false);
					},
					setIsProfileComplete: (value: boolean) =>
						set({ is_profile_complete: value }),
				}),
				{
					name: "storage-name",
				}
			),
			{
				enabled: process.env.NODE_ENV === "development",
				name: "user-auth-store",
			}
		)
	)
);

export default useAuthStore;
