import { JSX } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller, UseControllerProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface InputProps
	extends UseControllerProps,
		Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "defaultValue"> {
	label?: string;
	asterik?: boolean;
	icon?: JSX.Element;
	className?: string;
	options?: any[];
	optionTitle?: string;
	optionValue?: string | any;
	optionLabel?: string | any;
	control: Control<any>;
	placeholder?: string;
}

export default function SelectField(props: InputProps) {
	const {
		name,
		label = "",
		asterik = false,
		icon = "",
		className = "",
		optionTitle = "",
		optionValue = "value",
		optionLabel = "label",
		options,
		control,
		placeholder = "",
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value },
				formState: { errors },
				fieldState: { isTouched },
			}) => {
				const baseClass = cn(
					"w-full py-6 border border-gray-300 text-base ring-0 focus:ring-0 focus:ring-offset-0",
					icon && "pl-10",
					className,
					{
						"ring-1 ring-red-500 border-none focus:ring-1 focus:ring-red-500":
							isTouched && !!errors[name]?.message,
						"ring-1 ring-red-600 border-none focus:ring-1 focus:ring-red-500":
							!!errors[name]?.message,
					}
				);
				return (
					<>
						{label && (
							<label htmlFor={name} className="input-label">
								{asterik && (
									<span className="mr-[6px] text-[#DB1813]">*</span>
								)}
								{label}
							</label>
						)}
						<div className="relative">
							{icon && (
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5">
									<span className="pr-[12px]">{icon}</span>
								</div>
							)}
							<Select value={value} onValueChange={onChange}>
								<SelectTrigger className={baseClass}>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>{optionTitle}</SelectLabel>
										{options?.map((data: any) => (
											<SelectItem
												key={data[optionValue]}
												value={data[optionValue]}
											>
												{data[optionLabel]}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
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
			}}
		/>
	);
}
