import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCallback } from "react";
import { ProfileInputs, profileSchema } from "@/validations/profile-schema";
import steps from "./steps";
import StepperLabel from "./stepper-label";
import StepperControl from "./stepper-control";
// import { Button } from "@/components/ui/button";
import ExperienceInformation from "./experience-info";
import SkillsInformation from "./skills-info";

const initialValues = {
	role: "",
	profile_pic: "",
	experience_level: "",
	portfolio_link: "",
	skills: [],
};

export default function Profile() {
	const [activeStep, setActiveStep] = useState(1);
	const isLastStep = activeStep === steps.length;
	// const { mutate: signupUser, isPending, isError, error } = useSignupUser();
	const methods = useForm<ProfileInputs>({
		resolver: zodResolver(profileSchema),
		mode: "onChange",
		defaultValues: initialValues,
		shouldUnregister: false,
	});

	const nextStep = async () => {
		const { fields } = steps[activeStep - 1];
		const output = await methods.trigger(fields as any[], {
			shouldFocus: true,
		});
		if (!output) return;
		if (isLastStep) {
			return;
		}
		setActiveStep((prevStep) => prevStep + 1);
	};

	const RenderStep = useCallback(() => {
		switch (activeStep) {
			case 1:
				return <ExperienceInformation />;
			case 2:
				return <SkillsInformation />;
			default:
				return null;
		}
	}, [activeStep]);

	const processForm: SubmitHandler<ProfileInputs> = async (data) => {
		JSON.stringify(data);
		// signupUser(data);
		// console.log("Form Errors:", methods.formState.errors);
	};
	return (
		<div className="mx-auto">
			<div className="mt-10 w-full px-3 md:pr-5">
				{/* <pre>{JSON.stringify(methods.watch(), null, 2)}</pre> */}
				<div className="space-y-5 overflow-hidden rounded-lg">
					<StepperLabel steps={steps} activeStep={activeStep} />
					<div className="w-full">
						<div className="flex flex-col gap-8">
							<div className="md:overflow-y-auto">
								<FormProvider {...methods}>
									<RenderStep />
								</FormProvider>
							</div>
						</div>
					</div>
				</div>
				<StepperControl
					activeStep={activeStep}
					nextStep={nextStep}
					isLastStep={isLastStep}
					handleSubmit={methods.handleSubmit(processForm)}
				/>
			</div>
		</div>
	);
}
