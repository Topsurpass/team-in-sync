import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type StepperControlType = {
	activeStep: number;
	prevStep: () => void;
	nextStep: () => void;
	isLastStep: boolean;
	handleSubmit: () => void;
	isLoading: boolean;
};

export default function StepperControl({
	activeStep,
	prevStep,
	nextStep,
	isLastStep,
	handleSubmit,
	isLoading,
}: StepperControlType) {
	return (
		<section className={cn("flex w-full justify-center gap-3 px-4")}>
			<Button className={activeStep === 1 ? "hidden" : ""} onClick={prevStep}>
				Previous
			</Button>
			<Button
				isLoading
				disabled={isLoading}
				onClick={isLastStep ? handleSubmit : nextStep}
				className="w-full rounded-full md:w-2/3"
				size={"lg"}
			>
				{isLastStep ? "Submit" : "Continue"}
			</Button>
		</section>
	);
}
