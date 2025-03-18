import React, { createContext, useEffect, useMemo, useState } from "react";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: string;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: string;
	setTheme: (_theme: string) => void;
};

const initialState = {
	theme: "system",
	setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export default function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "shw-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState(
		() => localStorage.getItem(storageKey) || defaultTheme
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = useMemo(() => {
		return {
			theme,
			setTheme: (val: string) => {
				localStorage.setItem(storageKey, val);
				setTheme(val);
			},
		};
	}, [storageKey, theme]);

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
