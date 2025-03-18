import plugin from "tailwindcss/plugin";

const shadcnPlugin = plugin(
	// Add css variable definitions to the base layer

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
				},
			},
		},
	}
);

export default shadcnPlugin;
