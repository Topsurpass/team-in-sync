import { StylesConfig } from "react-select";

export const reactSelectStyle = (
	errors: any,
	name: string,
	isDisabled: boolean
): StylesConfig<any, any> => ({
	control: (base: any) => ({
		...base,
		backgroundColor: isDisabled
			? "rgb(229 231 235 / 0.5)"
			: "hsl(var(--input-bg-color))",
		padding: "3px",
		minHeight: "20px",
		borderRadius: "6px",
		boxShadow: "none",
		outline: "none",
		cursor: "pointer",
		border: `1.5px solid ${errors[name] && errors[name]?.message ? "#ef4444" : "#6b7280"} `,
	}),
	option: (styles: any, { isSelected }: { isSelected: boolean }) => {
		return {
			...styles,
			cursor: "pointer",
			color: isSelected ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
			backgroundColor: isSelected
				? "hsl(var(--background))"
				: "hsl(var(--background))",
		};
	},
	multiValue: (styles: any) => {
		return {
			...styles,
			borderRadius: "8px",
			backgroundColor: "#F1F4FF",
		};
	},
	multiValueLabel: (styles: any) => {
		return {
			...styles,
			color: "#324DB7",
		};
	},
	multiValueRemove: (styles: any) => {
		return {
			...styles,
			borderRadius: "10px",
			backgroundColor: "#F1F4FF",
			color: "#324DB7",
			fontSize: "20px",
			":hover": {
				color: "red",
			},
		};
	},
	singleValue: (styles: any) => {
		return {
			...styles,
			color: "hsl(var(--foreground))",
		};
	},
	menuPortal: (base: any) => ({ ...base, zIndex: 999 }),
	menu: (base: any) => ({ ...base, zIndex: 999 }),
	placeholder: (base: any) => {
		return {
			...base,
			fontSize: "14px",
			fontWeight: "300",
			color: "#d1d5db",
		};
	},
});
