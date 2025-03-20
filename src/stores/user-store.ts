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
	phone: string;
	roles: string[];
	authorities: string[];
	isAuthenticated: boolean;
	isSuperAdmin: boolean;
	userStatus: string;
	address: string;
};

type TAction = {
	setUser: (_payload: any) => void;
	reset: () => void;
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
	phone: "",
	roles: [],
	authorities: [],
	isAuthenticated: false,
	isSuperAdmin: false,
	userStatus: "",
	address: "",
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
							state.accessToken = payload.token;
							state.refreshToken = payload.refreshToken;
							state.email = payload.email;
							state.firstname = payload.firstname;
							state.lastname = payload.lastname;
							state.roles = payload.roles;
							state.authorities = payload.roles[0].permissions;
							state.isAuthenticated = true;
							state.isSuperAdmin = !payload?.userTenant;
							state.id = payload.id;
							state.phone = payload.phone;
							state.address = payload.address;
						}),
					reset: () => {
						set(initialState);
						setAuthToken(false);
						setAuthTokenHTTP(false);
					},
				}),
				{
					name: "storage-name",
					// getStorage: ()=> sessionStorage
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
