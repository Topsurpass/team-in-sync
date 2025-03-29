import { useFormContext } from "react-hook-form";
import { useEffect, useMemo } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ReactSelect } from "@/components/ui/forms";
import useGetSkills from "@/api/skills/use-get-skills";

export default function SkillsInformation() {
	const { control, watch, trigger, setValue } = useFormContext();
	const role = watch("role")?.value;
	const { data, isLoading } = useGetSkills(role);

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

	return (
		<div className="flex justify-center">
			<Card className="w-full border-0 shadow-none">
				<CardHeader className="mb-5">
					<CardTitle className="text-xl md:text-2xl">
						Create your profile
					</CardTitle>
				</CardHeader>
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
				</CardContent>
				<CardFooter className="flex flex-col space-y-4"></CardFooter>
			</Card>
		</div>
	);
}
