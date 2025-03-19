import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

export default function ReactDatePicker({
	label,
	name,
	errors,
	control,
	format,
	defaultValue,
	rules,
	className,
}: any) {
	const labelId = `${name}-label`;
	const error = errors?.[name]?.message;

	return (
		<div className={`mt-2 w-full ${className}`}>
			<label
				htmlFor="dateLabel"
				id={labelId}
				className="mb-1 block text-sm font-bold text-gray-700"
			>
				{label}
			</label>
			<Controller
				render={({ field }) => (
					<DatePicker
						id={labelId}
						selected={field.value ? new Date(field.value) : null}
						onChange={field.onChange}
						className={`w-full rounded border p-2 ${error ? "border-red-500" : "border-gray-300"}`}
						dateFormat={format}
						placeholderText={format.toUpperCase()}
					/>
				)}
				defaultValue={defaultValue}
				control={control}
				name={name}
				rules={rules}
			/>
			{error && <p className="mt-1 text-xs text-red-500">{error}</p>}
		</div>
	);
}

ReactDatePicker.defaultProps = {
	format: "yyyy/MM/dd",
};

ReactDatePicker.propTypes = {
	format: PropTypes.string,
};
