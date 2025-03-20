import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type StepperControlType = {
	activeStep: number;
	nextStep: () => void;
	isLastStep: boolean;
	handleSubmit: () => void;
};

export default function StepperControl({
	nextStep,
	isLastStep,
	handleSubmit,
}: StepperControlType) {
	return (
		<section className={cn("flex w-full justify-center gap-3 p-4")}>
			<Button
				onClick={isLastStep ? handleSubmit : nextStep}
				className="w-full rounded-3xl md:w-1/4"
			>
				{isLastStep ? "Submit" : "Continue"}
			</Button>
		</section>
	);
}
