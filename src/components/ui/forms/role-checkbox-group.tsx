import { Control, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Permission {
	label: string;
	value: string;
}

interface CheckboxGroupProps extends React.ComponentProps<"input"> {
	title: string;
	options: Permission[];
	control: Control<any>;
	name: string;
	className?: string;
}

export default function RoleCheckboxGroup({
	title,
	options,
	control,
	name,
	className,
	...props
}: CheckboxGroupProps) {
	return (
		<div className="flex gap-2 p-4">
			<h3 className="w-[18%] text-base font-bold">{title}</h3>
			<div className={cn("grid flex-1 grid-cols-3 gap-3", className)}>
				{options?.map((option) => (
					<div
						className="flex items-center gap-1 whitespace-nowrap"
						key={option.value}
					>
						<Controller
							name={name}
							control={control}
							render={({ field: { value, onChange } }) => {
								return (
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
										className={cn(
											"checked:!bg-royal disabled:bg-gray-200 hover:disabled:cursor-not-allowed"
										)}
										{...props}
									/>
								);
							}}
						/>
						<span className="break-words">{option.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}
