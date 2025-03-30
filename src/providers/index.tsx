import React from "react";
import ThemeProvider from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import ToastProvider from "@/providers/toast-provider";
import { GlobalProvider } from "./global-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<GlobalProvider>
			<ThemeProvider>
				<ReactQueryProvider>
					{children}
					<ToastProvider />
				</ReactQueryProvider>
			</ThemeProvider>
		</GlobalProvider>
	);
}
