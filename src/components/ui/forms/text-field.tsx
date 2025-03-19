import React from "react";
import { JSX } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Control, useController, UseControllerProps } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputProps
	extends UseControllerProps,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
	label?: string;
	type?: string;
	icon?: JSX.Element;
	className?: string;
	placeholder?: string;
	control: Control<any>;
	iconPosition?: "left" | "right";
}

export default function TextField(props: InputProps) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { isTouched },
		formState: { errors },
	} = useController(props);

	const {
		type = "text",
		name,
		label = "",
		icon = "",
		className = "",
		iconPosition = "left",
		...others
	} = props;

	const baseClass = cn(
		`input-control`,
		"placeholder:text-sm placeholder:text-gray-400 placeholder:font-light pl-2",
		icon && iconPosition === "left" && "pl-8",
		icon && iconPosition === "right" && "pr-8",
		{
			"ring-1 ring-red-500 border-none focus:ring-1 focus:ring-red-500":
				isTouched && !!errors[name]?.message,
			"ring-1 ring-red-600 border-none focus:ring-1 focus:ring-red-500":
				!!errors[name]?.message,
		},
		className
	);

	return (
		<>
			{label && (
				<label htmlFor="username" className="input-label">
					{label}
				</label>
			)}
			<div className="relative">
				{icon && (
					<div
						className={cn(
							"pointer-events-none absolute inset-y-0 flex items-center px-2.5",
							iconPosition === "left" && "left-0",
							iconPosition === "right" && "right-0"
						)}
					>
						<span className="pr-[12px]">{icon}</span>
					</div>
				)}
				<input
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className={baseClass}
					// autoComplete="off"
					{...others}
				/>
			</div>
			<ErrorMessage
				errors={errors}
				name={name}
				render={({ message }) => (
					<p className="mt-1 text-sm text-red-500">{message}</p>
				)}
			/>
		</>
	);
}
