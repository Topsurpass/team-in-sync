//import _ from "lodash";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// format time into minutes and seconds
export function formatTime(seconds: number) {
	if (seconds >= 60) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes} minute${minutes > 1 ? "s" : ""} ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
	}
	return `${seconds} second${seconds !== 1 ? "s" : ""}`;
}

// Utility function to generate a range of numbers
export const range = (start: number, end: number, step: number = 1): number[] => {
	const output: number[] = [];
	for (let i = start; i < end; i += step) {
		output.push(i);
	}
	return output;
};
