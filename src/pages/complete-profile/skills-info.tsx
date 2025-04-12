import { useFormContext } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ReactSelect } from "@/components/ui/forms";
import useGetSkills from "@/api/skills/use-get-skills";
import { TextField } from "@/components/ui/forms";
import useGetProfile from "@/api/profile/use-get-profile";

export default function SkillsInformation() {
	const { control, watch, trigger, setValue } = useFormContext();
	const role = watch("role")?.value;
	const { data, isLoading } = useGetSkills(role);
	const { data: profile } = useGetProfile();

	useEffect(() => {
		if (role) {
			setValue("skills", []);
			trigger("skills");
		}
	}, [role, setValue, trigger]);

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

	return (
		<div className="flex justify-center">
			<Card className="w-full border-0 shadow-none">
				<CardContent className="grid gap-4">
					<div>
						<ReactSelect
							label="Skills"
							control={control}
							name="skills"
							options={formattedSkills}
							isLoading={isLoading}
							isDisabled={isLoading}
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
						/>
					</div>
					<div className="w-full">
						<TextField
							label="GitHub"
							name="github_link"
							control={control}
							iconPosition="left"
							placeholder="Type your GitHub URL (Optional)"
						/>
					</div>

					<TextField
						label="LinkedIn"
						name="linkedin_link"
						control={control}
						iconPosition="left"
						placeholder="Type your LinkedIn URL (Optional)"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
