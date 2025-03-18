import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import shadcnPlugin from "./shadcn-plugin";

const globalPreset = {
	content: [],
	plugins: [
		shadcnPlugin,
		tailwindAnimate,
		typography,
		forms,
		aspectRatio,
		containerQueries,
	],
} satisfies Config;

export default globalPreset;
