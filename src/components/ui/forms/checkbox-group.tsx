import { Control, Controller } from "react-hook-form";

interface Permission {
	label: string;
	value: string;
}

interface CheckboxGroupProps {
	title: string;
	options: Permission[];
	control: Control<any>;
	name: string;
}

export default function CheckboxGroup({
	title,
	options,
	control,
	name,
}: CheckboxGroupProps) {
	return (
		<div className="flex flex-col gap-1">
			<h3 className="text-base font-bold">{title}</h3>
			<div className="flex flex-col gap-1">
				{options.map((option) => (
					<div key={option.value} className="flex items-center gap-3">
						<Controller
							name={name}
							control={control}
							render={({ field: { value, onChange } }) => {
								return (
									//   <input type="checkbox" {...field} checked={field.value} />
									<input
										type="checkbox"
										value={option.value}
										checked={value?.includes(option.value)}
										onChange={(e) => {
											const { checked } = e.target;
											onChange(
												checked
													? [...value, option.value]
													: value?.filter(
															(val: any) =>
																val !== option.value
														)
											);
										}}
									/>
								);
							}}
						/>
						<span>{option.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}
