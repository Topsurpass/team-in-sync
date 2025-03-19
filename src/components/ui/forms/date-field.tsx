import React, { useState, useRef, useEffect } from "react";
import { Controller, Control, FieldValues, FieldErrors } from "react-hook-form";

interface ScrollableDateInputProps {
	label: string;
	name: string;
	errors?: FieldErrors;
	control: Control<FieldValues>;
	defaultValue?: Date;
	rules?: object;
	showDay?: boolean;
	showMonth?: boolean;
	showYear?: boolean;
	className?: string;
}

export default function ScrollableDateInput({
	label,
	name,
	errors,
	control,
	defaultValue,
	rules,
	showDay = false,
	showMonth = true,
	showYear = true,
	className,
}: ScrollableDateInputProps) {
	const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
		defaultValue?.getMonth()
	);
	const [selectedYear, setSelectedYear] = useState<number | undefined>(
		defaultValue?.getFullYear()
	);
	const [selectedDay, setSelectedDay] = useState<number | undefined>(
		defaultValue?.getDate()
	);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLDivElement>(null);

	const months = Array.from({ length: 12 }, (_, i) =>
		new Date(0, i).toLocaleString("default", { month: "long" })
	);
	const years = Array.from(
		{ length: new Date().getFullYear() - 1990 + 1 },
		(_, i) => i + 1990
	);
	const days = Array.from({ length: 31 }, (_, i) => i + 1);

	const handleMonthChange = (month: number) => {
		setSelectedMonth(month);
	};

	const handleYearChange = (year: number, field: any) => {
		setSelectedYear(year);
		if (showMonth && showYear) {
			setIsOpen(false);
		}

		if (selectedMonth !== undefined) {
			const dateValue = new Date(year, selectedMonth, selectedDay || 1);
			field.onChange(dateValue);
		}
	};

	const handleDayChange = (day: number) => {
		setSelectedDay(day);
	};

	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!inputRef.current?.contains(e.relatedTarget as Node)) setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleKeyDown = (event: any, day: number) => {
		if (event.key === "Enter" || event.key === " ") {
			// Trigger click handler
			handleDayChange(day);
		}
	};

	const handleKeyDownMonth = (event: any, month: number) => {
		if (event.key === "Enter" || event.key === " ") {
			// Trigger click handler
			handleMonthChange(month);
		}
	};

	const handleKeyDownYear = (event: any, year: number, field: any) => {
		if (event.key === "Enter" || event.key === " ") {
			// Trigger click handler
			handleYearChange(year, field);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	// Only format the date if all relevant parts are selected
	const formattedDate =
		(showDay && selectedDay !== undefined
			? `${selectedDay < 10 ? "0" : ""}${selectedDay}/`
			: "") +
		(showMonth && selectedMonth !== undefined
			? `${selectedMonth + 1 < 10 ? "0" : ""}${selectedMonth + 1}/`
			: "") +
		(showYear && selectedYear !== undefined ? selectedYear : "");

	return (
		<div className={`mt-2 w-full ${className}`}>
			<label
				htmlFor="username"
				className="mb-1 block text-sm font-bold text-gray-700"
			>
				{label}
			</label>
			<div ref={inputRef}>
				<Controller
					name={name}
					control={control}
					rules={rules}
					render={({ field }) => (
						<>
							<input
								type="text"
								value={formattedDate}
								onClick={() => setIsOpen(!isOpen)}
								readOnly
								className={`w-full cursor-pointer rounded border p-2 ${
									errors?.[name] ? "border-red-500" : "border-gray-300"
								}`}
							/>

							{isOpen && (
								<div
									className="absolute z-10 mt-2 rounded-lg border bg-white shadow-lg"
									onBlur={handleBlur}
									tabIndex={-1}
								>
									<h3 className="bg-[#CCE0FF] p-2 text-gray-600">
										Please select date
									</h3>
									<div className="flex space-x-4 p-4">
										{showDay && (
											<div className="flex-1">
												<div className="h-40 overflow-y-scroll rounded border p-2">
													{days.map((day) => (
														<div
															role="button"
															tabIndex={0}
															key={day}
															onKeyDown={(event) =>
																handleKeyDown(event, day)
															}
															onClick={() =>
																handleDayChange(day)
															}
															className={`cursor-pointer rounded p-1 ${
																selectedDay === day
																	? "bg-blue-500 text-white"
																	: "hover:bg-gray-100"
															}`}
														>
															{day}
														</div>
													))}
												</div>
											</div>
										)}

										{showMonth && (
											<div className="flex-1">
												<div className="h-40 overflow-y-scroll rounded border p-2">
													{months.map((month, index) => (
														<div
															role="button"
															tabIndex={0}
															key={month}
															onKeyDown={(event) =>
																handleKeyDownMonth(
																	event,
																	index
																)
															}
															onClick={() =>
																handleMonthChange(index)
															}
															className={`cursor-pointer rounded p-1 ${
																selectedMonth === index
																	? "bg-blue-500 text-white"
																	: "hover:bg-gray-100"
															}`}
														>
															{month}
														</div>
													))}
												</div>
											</div>
										)}

										{showYear && (
											<div className="flex-1">
												<div className="h-40 overflow-y-scroll rounded border p-2">
													{years.map((year) => (
														<div
															role="button"
															tabIndex={0}
															key={year}
															onKeyDown={(event) =>
																handleKeyDownYear(
																	event,
																	year,
																	field
																)
															}
															onClick={() =>
																handleYearChange(
																	year,
																	field
																)
															}
															className={`cursor-pointer rounded p-1 ${
																selectedYear === year
																	? "bg-blue-500 text-white"
																	: "hover:bg-gray-100"
															}`}
														>
															{year}
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</div>
							)}
						</>
					)}
				/>
			</div>

			{errors?.[name] && (
				<p className="mt-1 text-xs text-red-500">
					{errors[name]?.message as any}
				</p>
			)}
		</div>
	);
}
