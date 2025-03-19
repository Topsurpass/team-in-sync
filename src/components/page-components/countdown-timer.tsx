import { useState, useEffect, useCallback, useMemo } from "react";

interface CountdownTimerProps {
	countdownDate: string;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export default function CountdownTimer({ countdownDate }: CountdownTimerProps) {
	const targetDate = new Date(countdownDate).getTime();

	const calculateTimeLeft = useCallback((): TimeLeft => {
		const now = new Date().getTime();
		const difference = targetDate - now;

		if (difference <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((difference % (1000 * 60)) / 1000),
		};
	}, [targetDate]);

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
	const [isLaunched, setIsLaunched] = useState(false);

	const timeSegments = useMemo(
		() => [
			{ value: timeLeft.days, label: "Days" },
			{ value: timeLeft.hours, label: "Hours" },
			{ value: timeLeft.minutes, label: "Minutes" },
			{ value: timeLeft.seconds, label: "Seconds" },
		],
		[timeLeft]
	);

	useEffect(() => {
		const timer = setInterval(() => {
			const newTimeLeft = calculateTimeLeft();
			setTimeLeft(newTimeLeft);

			if (
				newTimeLeft.days +
					newTimeLeft.hours +
					newTimeLeft.minutes +
					newTimeLeft.seconds <=
				0
			) {
				setIsLaunched(true);
				clearInterval(timer);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [calculateTimeLeft]);

	if (isLaunched) {
		return (
			<div className="animate-fade-in text-3xl md:text-6xl">
				🎉 We're Live! Welcome! 🎉
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
			{timeSegments.map((segment) => (
				<div
					key={segment.label}
					className="flex flex-col items-center rounded-2xl bg-black p-6 text-white backdrop-blur-lg transition-all duration-300 hover:scale-105 dark:bg-white dark:text-black"
				>
					<span className="text-4xl font-extrabold md:text-6xl">
						{segment.value.toString().padStart(2, "0")}
					</span>
					<span className="mt-2 text-sm font-semibold uppercase tracking-widest">
						{segment.label}
					</span>
				</div>
			))}
		</div>
	);
}
