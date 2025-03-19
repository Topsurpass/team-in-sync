import React, { JSX } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Control, useController, UseControllerProps } from "react-hook-form";
import { EyeIcon, EyeOff, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps
	extends UseControllerProps,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
	label?: string;
	asterik?: boolean;
	icon?: JSX.Element;
	className?: string;
	control: Control<any>;
	onIconClick?: () => void;
	showPassword?: boolean;
	showLeftIcon?: boolean;
	type: string;
}

export default function PasswordField(props: InputProps) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { isTouched },
		formState: { errors },
	} = useController(props);

	const {
		name,
		label = "",
		type = "password",
		asterik = false,
		onIconClick = undefined,
		showPassword = false,
		className = "",
		showLeftIcon = true,
		...others
	} = props;

	const baseClass = cn(
		`input-control pr-12`,
		// icon && iconPosition === "left" && "pl-10",
		// icon && iconPosition === "right" && "pr-12",
		"placeholder:text-sm placeholder:text-gray-400 placeholder:font-light",
		{
			"ring-1 ring-red-500 border-none focus:ring-1 focus:ring-red-500":
				isTouched && !!errors[name]?.message,
			"ring-1 ring-red-600 border-none focus:ring-1 focus:ring-red-500":
				!!errors[name]?.message,
			"pl-10": showLeftIcon,
		},
		className
	);

	return (
		<>
			{label && (
				<label htmlFor="username" className="input-label">
					{asterik && <span className="mr-[6px] text-[#DB1813]">*</span>}
					{label}
				</label>
			)}
			<div className="relative">
				{showLeftIcon && (
					<button
						type="button"
						className={cn(
							"absolute inset-y-0 left-0 flex items-center px-2.5"
						)}
					>
						<span>
							<LockKeyhole size={20} />
						</span>
					</button>
				)}
				<button
					type="button"
					className={cn("absolute inset-y-0 right-0 flex items-center px-2.5")}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						if (onIconClick) onIconClick();
					}}
				>
					<span className="pr-[12px]">
						{showPassword ? (
							<EyeOff size={20} className="text-gray-500" />
						) : (
							<EyeIcon size={20} className="text-gray-500" />
						)}
					</span>
				</button>
				<input
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					type={type}
					className={baseClass}
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
