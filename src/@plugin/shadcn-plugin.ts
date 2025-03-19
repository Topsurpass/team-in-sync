import plugin from "tailwindcss/plugin";

const shadcnPlugin = plugin(
	function ({ addBase }) {
		addBase({
			":root": {},
		});
	},
	{
		theme: {
			extend: {
				colors: {
					background: "hsl(var(--background))",
					foreground: "hsl(var(--foreground))",
					royal: {
						DEFAULT: "#2563EB",
						light: "#E9EFFD",
					},
				},
				fontFamily: {
					sans: ["Poppins", "sans-serif"],
					lato: ["Lato", "Poppins", "sans-serif"],
				},
			},
		},
	}
);

export default shadcnPlugin;
