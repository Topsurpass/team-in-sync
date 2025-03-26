import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCallback } from "react";
import { ProfileInputs, profileSchema } from "@/validations/profile-schema";
import steps from "./steps";
import StepperLabel from "./stepper-label";
import StepperControl from "./stepper-control";
import ExperienceInformation from "./experience-info";
import SkillsInformation from "./skills-info";
import useAuthStore from "@/stores/user-store";

const initialValues = {
	role: "",
	bio: "",
	full_name: "",
	profile_picture: undefined,
	experience_level: "",
	portfolio_link: "",
	github_link: "",
	linkedin_link: "",
	skills: [],
};

export default function CompleteProfile() {
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = useState(1);
	const isLastStep = activeStep === steps.length;
	const setIsProfileComplete = useAuthStore((state) => state.setIsProfileComplete);

	// const { mutate: signupUser, isPending, isError, error } = useSignupUser();
	const methods = useForm<ProfileInputs>({
		resolver: zodResolver(profileSchema),
		mode: "onChange",
		defaultValues: initialValues,
		shouldUnregister: false,
	});

	const prevStep = useCallback(() => {
		if (activeStep === 1) return;
		setActiveStep(activeStep - 1);
	}, [activeStep]);

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
		try {
			const formData: any = new FormData();
			formData.append("image", data?.profile_picture);
			formData.append("role", data?.role);
			formData.append("bio", data?.bio);
			formData.append("full_name", data?.full_name);
			formData.append("experience_level", data?.experience_level);
			formData.append("portfolio_link", data?.portfolio_link);
			formData.append("github_link", data?.github_link);
			formData.append("linkedin_link", data?.linkedin_link);

			data?.skills.forEach((skill: any, index: number) => {
				formData.append(`skills[${index}]`, skill.value);
			});
			setIsProfileComplete(true);
			return navigate("/dashboard");
		} catch (error: any) {
			const { message } = error.response.data;
			return message;
		}
	};
	return (
		<div className="mx-auto max-w-lg">
			<div className="mt-10 w-full md:px-3 md:pr-5">
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
					prevStep={prevStep}
					nextStep={nextStep}
					isLastStep={isLastStep}
					handleSubmit={methods.handleSubmit(processForm)}
				/>
			</div>
		</div>
	);
}
