import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller, UseControllerProps } from "react-hook-form";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import { cn } from "@/lib/utils";

// import CreatableSelect from "react-select/creatable";

const animatedComponent = makeAnimated();

interface InputProps extends UseControllerProps {
	label?: string;
	asterik?: boolean;
	className?: string;
	loadOptions: any;
	defaultOptions?: any;
	control: Control<any>;
	isMulti?: boolean;
	isDisabled?: boolean;
	closeMenuOnSelect?: boolean;
	isLoading?: boolean;
	placeholder?: string;
}

export default function AsyncReactSelectField({
	name,
	className = "",
	label = "",
	asterik = false,
	isMulti = false,
	closeMenuOnSelect = true,
	isDisabled = false,
	isLoading = false,
	loadOptions,
	defaultOptions = [],
	placeholder = "",
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
				const selectStyle = {
					control: (styles: any) => ({
						...styles,
						backgroundColor: isDisabled
							? "rgb(229 231 235 / 0.5)"
							: "hsl(var(--input-bg-color))",
						padding: "3px",
						minHeight: "20px",
						borderRadius: "6px",
						boxShadow: "none",
						outline: "none",
						cursor: "pointer",
						color: "red",
						border: `1.5px solid ${errors[name] && errors[name]?.message ? "red" : "#d1d5db"} `,
					}),
					option: (styles: any, { isSelected }: { isSelected: boolean }) => {
						return {
							...styles,
							cursor: "pointer",
							color: isSelected && "hsl(var(--background))",
							backgroundColor: isSelected
								? "green"
								: "hsl(var(--input-bg-color))",
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
						};
					},
					multiValueRemove: (styles: any) => {
						return {
							...styles,
							borderRadius: "0px",
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
							// fontSize: "14px",
							fontWeight: "300",
							color: "#d1d5db",
						};
					},
				};

				return (
					<>
						{label && (
							<label htmlFor={name} className="text-base">
								{asterik && <span className="text-red-600">*</span>}
								&nbsp;{label}
							</label>
						)}
						<AsyncSelect
							components={animatedComponent}
							loadOptions={loadOptions}
							defaultOptions={defaultOptions}
							cacheOptions
							styles={selectStyle}
							className={cn("basic-multi-select", className)}
							classNamePrefix="react-select"
							isClearable
							isMulti={isMulti}
							isDisabled={isDisabled}
							menuPlacement="bottom"
							closeMenuOnSelect={closeMenuOnSelect}
							isLoading={isLoading}
							placeholder={placeholder}
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
