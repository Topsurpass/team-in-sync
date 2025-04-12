import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { useCallback } from "react";
import { ProfileInputs, profileSchema } from "@/validations/profile-schema";
import steps from "./steps";
import StepperLabel from "./stepper-label";
import StepperControl from "./stepper-control";
import UserInfo from "./user-info";
import SkillsInformation from "./skills-info";
import useProfileUpdate from "@/api/authentication/use-profile-update";
import useAuthStore from "@/stores/user-store";
import QueryKeys from "@/api/query-keys";

const initialValues = {
	bio: "",
	full_name: "",
	profile_picture: undefined,
	portfolio_link: "",
	github_link: "",
	linkedin_link: "",
	skills: [],
};

export default function CompleteProfile() {
	const [activeStep, setActiveStep] = useState(1);
	const isLastStep = activeStep === steps.length;
	const { mutate: updateProfile, isPending } = useProfileUpdate();
	const store = useAuthStore((state) => state);
	const setIsProfileComplete = store.setIsProfileComplete;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

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
				return <UserInfo />;
			case 2:
				return <SkillsInformation />;
			default:
				return null;
		}
	}, [activeStep]);

	const processForm: SubmitHandler<ProfileInputs> = async (data) => {
		const formData: any = new FormData();
		formData.append("profile_picture", data?.profile_picture);
		formData.append("role", data?.role.value);
		formData.append("bio", data?.bio);
		formData.append("full_name", data?.full_name);
		formData.append("experience_level", data?.experience_level.value);
		formData.append("portfolio_link", data?.portfolio_link);
		formData.append("github_link", data?.github_link);
		formData.append("linkedin_link", data?.linkedin_link);
		const skillsString = data?.skills.map((skill: any) => skill.value).join(",");
		formData.append("skills", skillsString);
		updateProfile(formData, {
			onSuccess: () => {
				setIsProfileComplete(true);
				navigate("/");
				toast.success(`Welcome!`, {
					description: "You are one step away from the next big thing!",
				});
				queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_PROFILE] });
			},
			onError: (err) => {
				toast.error("Profile update failed", {
					description: err?.message,
				});
			},
		});
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
					isLoading={isPending}
				/>
			</div>
		</div>
	);
}
