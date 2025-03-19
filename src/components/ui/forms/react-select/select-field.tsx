import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller } from "react-hook-form";
import Select, { MenuPlacement, Props as SelectProps } from "react-select";
import { cn } from "@/lib/utils";
import { reactSelectStyle } from "@/lib/style";

// import { Option, MultiValueLabel, SingleValue } from "./custom-component";

// import CreatableSelect from "react-select/creatable";
interface InputProps extends SelectProps {
	label?: string;
	className?: string;
	name: string;
	options: any[];
	control: Control<any>;
	isDisabled?: boolean;
	isLoading?: boolean;
	placeholder?: string;
	menuPlacement?: MenuPlacement;
}

export default function ReactSelectField({
	name,
	className = "",
	label = "",
	isDisabled = false,
	isLoading = false,
	options,
	placeholder = "",
	control,
	menuPlacement = "auto",
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
							<label htmlFor={name} className="input-label">
								{label}
							</label>
						)}
						<Select
							options={options}
							styles={reactSelectStyle(errors, name, isDisabled)}
							className={cn("react-select-container", className)}
							classNamePrefix="react-select"
							isClearable
							isDisabled={isDisabled}
							isLoading={isLoading}
							placeholder={placeholder}
							isSearchable
							menuPortalTarget={document.body}
							menuPosition="absolute"
							menuPlacement={menuPlacement}
							maxMenuHeight={350}
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

// closeMenuOnSelect = { closeMenuOnSelect };
// menuShouldScrollIntoView={false}
// value={options?.find((c) => c?.value === value)}
// onChange={(e) => onChange(e.map((c: any) => c?.value))} = [0, 3, 4,5]
// components={{ Option, SingleValue, MultiValueLabel }}
// menuIsOpen

ReactSelectField.defaultProps = {};
