// import { KeyboardEventHandler, useState } from "react";
// import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller } from "react-hook-form";
import { Props as SelectProps } from "react-select";
// import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { reactSelectStyle } from "@/lib/style";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import CreatableSelect from "react-select/creatable";

// const animatedComponent = makeAnimated();

interface Option {
	readonly label: string;
	readonly value: string;
}

interface InputProps extends SelectProps {
	label?: string;
	control: Control<any>;
	placeholder?: string;
	options?: Option[];
	name: string;
}

// export const createOption = (label: string) => ({
//   label,
//   value: label,
// });

export default function SelectCreatableField({
	name,
	label = "",
	placeholder = "Type something and press enter to add invited minister...",
	control,
	options = [],
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
						<div>
							{label && (
								<label htmlFor={name} className="text-base">
									{label}
								</label>
							)}
							<div className="mt-1 flex items-center gap-2">
								<div className="w-[100%]">
									<CreatableSelect
										styles={reactSelectStyle(errors, name, false)}
										isClearable
										placeholder={placeholder}
										noOptionsMessage={() => placeholder}
										menuPortalTarget={document.body}
										menuPosition="absolute"
										// inputValue={inputValue}
										// onInputChange={(newValue) =>
										//     setInputValue(newValue)
										// }
										// onChange={(selectedValue) => {
										//     setValue(selectedValue as Option[]);
										//     field.onChange(selectedValue);
										// }}
										// value={value}
										// onKeyDown={handleKeyDown}
										options={options}
										{...field}
										{...others}
									/>
								</div>
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
			}}
		/>
	);
}
