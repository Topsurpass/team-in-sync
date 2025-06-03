import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ReactSelect } from "@/components/ui/forms";
import useGetSkills from "@/api/skills/use-get-skills";
import { TextField } from "@/components/ui/forms";
import useGetProfile from "@/api/profile/use-get-profile";
import {
	UserSkillsLinksInput,
	userSkillsAndLinksSchema,
} from "@/validations/profile-schema";
import { Button } from "@/components/ui/button";
import QueryKeys from "@/api/query-keys";
import useProfileUpdate from "@/api/authentication/use-profile-update";

export default function Skills() {
	const [isEditing, setIsEditing] = useState(false);
	const { control, setValue, trigger, handleSubmit } = useForm<UserSkillsLinksInput>({
		defaultValues: {
			portfolio_link: "",
			github_link: "",
			linkedin_link: "",
			skills: [
				{
					value: "",
					label: "",
				},
			],
		},
		resolver: zodResolver(userSkillsAndLinksSchema),
	});
	const { data: profile } = useGetProfile();
	const { data, isLoading } = useGetSkills();
	const { mutate: updateProfile, isPending } = useProfileUpdate();
	const queryClient = useQueryClient();

	const formattedSkills = useMemo(
		() =>
			(data as any)?.data?.map((skill: any) => ({
				value: skill.id,
				label: skill.name,
			})) || [],
		[data]
	);

	useEffect(() => {
		const profileData = (profile as any)?.data;
		if (profileData) {
			if (profileData.skills?.length > 0) {
				const defaultSkills = profileData.skills.map((item: any) => ({
					value: item.skill_details.id,
					label: item.skill_details.name,
				}));
				setValue("skills", defaultSkills);
				trigger("skills");
			}

			setValue("portfolio_link", profileData.portfolio_link || "");
			setValue("github_link", profileData.github_link || "");
			setValue("linkedin_link", profileData.linkedin_link || "");
		}
	}, [profile, setValue, trigger]);

	const processForm: SubmitHandler<UserSkillsLinksInput> = async (data) => {
		const formData: any = new FormData();
		formData.append("portfolio_link", data?.portfolio_link);
		formData.append("github_link", data?.github_link);
		formData.append("linkedin_link", data?.linkedin_link);
		const skillsString = data?.skills.map((skill: any) => skill.value).join(",");
		formData.append("skills", skillsString);
		updateProfile(formData, {
			onSuccess: () => {
				toast.success(`Profile Updated`, {
					description: "Skills and Social Links updated",
				});
				queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_PROFILE] });
				setIsEditing(false);
			},
			onError: (err) => {
				toast.error("Profile update failed", {
					description: err?.message,
				});
			},
		});
	};

	return (
		<div className="flex justify-center">
			<Card className="w-full border-0 shadow-none">
				{/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

				<CardContent className="grid gap-4 p-2">
					<div>
						<div className="flex w-full justify-end">
							<Button
								type="button"
								onClick={() => setIsEditing(true)}
								className="flex gap-2 rounded-3xl border border-royal text-royal"
								variant="outline"
							>
								<CiEdit size={20} /> Edit
							</Button>
						</div>
						<ReactSelect
							label="Skills"
							control={control}
							name="skills"
							options={formattedSkills}
							isLoading={isLoading}
							isDisabled={!isEditing || isLoading}
							isMulti
							placeholder="Select your skills"
						/>
					</div>
					<div>
						<TextField
							label="Portfolio"
							name="portfolio_link"
							control={control}
							iconPosition="left"
							placeholder="Type your portfolio link (Optional)"
							disabled={!isEditing}
						/>
					</div>
					<div className="w-full">
						<TextField
							label="GitHub"
							name="github_link"
							control={control}
							iconPosition="left"
							placeholder="Type your GitHub URL (Optional)"
							disabled={!isEditing}
						/>
					</div>

					<TextField
						label="LinkedIn"
						name="linkedin_link"
						control={control}
						iconPosition="left"
						placeholder="Type your LinkedIn URL (Optional)"
						disabled={!isEditing}
					/>
				</CardContent>
				<div className="flex justify-end p-4">
					<Button
						className="mr-2 rounded-3xl"
						type="submit"
						disabled={!isEditing}
						isLoading={isPending}
						onClick={handleSubmit(processForm)}
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								{"Saving..."}
							</>
						) : (
							<p>Save changes</p>
						)}
					</Button>
				</div>
			</Card>
		</div>
	);
}
