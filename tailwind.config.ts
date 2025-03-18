import globalPreset from "./src/@plugin/global-preset";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,ts,tsx}"],
	theme: {
		extend: {},
	},
	presets: [globalPreset],
};
