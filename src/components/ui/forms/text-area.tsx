import { JSX } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Control, useController, UseControllerProps } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputProps extends UseControllerProps {
	label?: string;
	asterik?: boolean;
	icon?: JSX.Element;
	className?: string;
	placeholder?: string;
	rows?: number;
	control: Control<any>;
}

export default function TextArea(props: InputProps) {
	const {
		field: { onChange, onBlur, value },
		fieldState: { isTouched },
		formState: { errors },
	} = useController(props);

	const {
		name,
		label = "",
		rows = 2,
		placeholder = "",
		asterik = false,
		icon,
		className = "",
		...others
	} = props;

	const baseClass = cn(
		"placeholder:text-sm placeholder:text-gray-400 placeholder:font-light pl-2",
		icon && "pl-10",
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
			<div>
				{label && (
					<label
						htmlFor={name}
						className="mb-1 block text-sm font-medium text-gray-700"
					>
						{asterik && <span className="mr-[6px] text-[#DB1813]">*</span>}
						{label}
					</label>
				)}
				<div className="relative">
					{icon && (
						<div
							className={cn(
								"pointer-events-none absolute inset-y-0 left-0 flex items-center px-3.5"
							)}
						>
							<span className="pr-[12px]">{icon}</span>
						</div>
					)}
					<textarea
						id={name}
						name={name}
						onChange={onChange}
						value={value}
						onBlur={onBlur}
						rows={rows}
						placeholder={placeholder}
						className={baseClass}
						{...others}
					/>
				</div>
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
