import { Loader2 } from "lucide-react";
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
		<section className={cn("flex w-full justify-between gap-3 px-4")}>
			<Button className={activeStep === 1 ? "hidden" : ""} onClick={prevStep}>
				Previous
			</Button>

			<Button disabled={isLoading} onClick={isLastStep ? handleSubmit : nextStep}>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						{isLastStep ? "Submitting..." : "Continuing..."}
					</>
				) : isLastStep ? (
					"Submit"
				) : (
					"Continue"
				)}
			</Button>
		</section>
	);
}
