import React from "react";
import ThemeProvider from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import ToastProvider from "@/providers/toast-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<ReactQueryProvider>
				{children}
				<ToastProvider />
			</ReactQueryProvider>
		</ThemeProvider>
	);
}
