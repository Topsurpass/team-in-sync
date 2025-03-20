interface IStepperLabel {
	steps: {
		step: number;
	}[];
	activeStep: number;
}

export default function StepperLabel({ steps, activeStep }: IStepperLabel) {
	return (
		<div>
			<div className="flex items-center justify-center md:mt-5">
				<p className="text-sm font-bold text-primary">
					Step {activeStep} of {steps.length}
				</p>
			</div>
		</div>
	);
}
