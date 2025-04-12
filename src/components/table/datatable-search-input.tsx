import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type IProps = {
	value: string | number;
	onChange: (_val: string | number) => void;
	debounce?: number;
	className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export default function DatatableSearchInput({
	value: initialValue,
	onChange,
	debounce = 1000,
	className = "",
	...props
}: IProps) {
	const [value, setValue] = useState<number | string>(initialValue);
	const inputRef = useRef<any>(null);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value, debounce, onChange]);

	useEffect(() => {
		if (value) {
			inputRef.current?.focus();
		}
	}, [value]);

	return (
		<div className="group relative rounded-md">
			<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
				<Search size={20} />
			</div>
			<input
				type="text"
				className={cn(
					"focus:ring-primary-200 bg-white pl-10 focus:border-primary/40",
					"block w-full rounded-md py-2 pr-10",
					"shadow-sm outline-none transition-all placeholder:text-sm",
					"hover:bg-gray-50 dark:hover:bg-transparent",
					className
				)}
				value={value}
				onChange={handleInputChange}
				ref={inputRef}
				{...props}
			/>
		</div>
	);
}
