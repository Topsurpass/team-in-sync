import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, Control } from "react-hook-form";
import Select, { createFilter, components as SelectComponents } from "react-select";

interface OptionType {
	label: string;
	value: string;
}

interface MultiSelectProps {
	name: string;
	label: string;
	options: OptionType[];
	control: Control<any>;
	margin?: string;
	placeholder?: string;
}

export default function MultiSelect({
	name,
	label,
	options,
	control,
	margin,
	placeholder,
	...props
}: MultiSelectProps) {
	const [newData, setNewData] = useState<OptionType[]>([]);

	useEffect(() => {
		const newOptions = options?.map((data) => ({
			label: data.label,
			value: data.value,
		}));
		setNewData(newOptions);
	}, [options]);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, formState: { errors } }) => (
				<div className={`relative block w-full bg-white ${margin || "my-2"}`}>
					<label
						htmlFor={name}
						className="relative text-base font-medium text-gray-800"
					>
						<span>{label}</span>
					</label>
					<Select
						inputId={name}
						options={newData}
						placeholder={placeholder}
						components={{ Option: SelectComponents.Option }}
						isClearable
						isSearchable
						menuPlacement="auto"
						filterOption={createFilter({ ignoreAccents: false })}
						{...props}
						{...field}
					/>
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<p className="mt-1 text-sm text-red-500">{message}</p>
						)}
					/>
				</div>
			)}
		/>
	);
}
