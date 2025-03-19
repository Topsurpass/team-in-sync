import { ErrorMessage } from "@hookform/error-message";
import {
	Control,
	Controller,
	// UseControllerProps
} from "react-hook-form";
import { Props as SelectProps } from "react-select";
// import makeAnimated from "react-select/animated";
import AsyncCreatableSelect from "react-select/async-creatable";
import { reactSelectStyle } from "@/lib/style";
import { cn } from "@/lib/utils";

// const animatedComponent = makeAnimated();

interface InputProps extends SelectProps {
	label?: string;
	className?: string;
	name: string;
	control: Control<any>;
	isDisabled?: boolean;
	isLoading?: boolean;
	loadOptions: (_inputValue: string) => Promise<any>;
}

export default function AsyncCreatableSelectField({
	name,
	className = "",
	label = "",
	isDisabled = false,
	isLoading = false,
	loadOptions,
	control,
	...others
}: InputProps) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field,
				formState: { errors },
				// fieldState: { isTouched },
			}) => {
				return (
					<>
						{label && (
							<label htmlFor={name} className="text-base">
								{label}
							</label>
						)}
						<AsyncCreatableSelect
							// components={animatedComponent}
							cacheOptions
							loadOptions={loadOptions}
							styles={reactSelectStyle(errors, name, isDisabled)}
							className={cn("basic-multi-select", className)}
							isClearable
							isDisabled={isDisabled}
							// closeMenuOnSelect={closeMenuOnSelect}
							isLoading={isLoading}
							isSearchable
							menuPortalTarget={document.body}
							menuPosition="fixed"
							{...field}
							{...others}
						/>
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
