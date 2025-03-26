import React from "react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import ThemeProvider from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import ToastProvider from "@/providers/toast-provider";
import GoogleAuth from "./google-auth";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<ReactQueryProvider>
				<GoogleAuth>{children}</GoogleAuth>
				<ToastProvider />
			</ReactQueryProvider>
		</ThemeProvider>
	);
}
