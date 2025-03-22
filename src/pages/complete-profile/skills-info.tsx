import { useFormContext } from "react-hook-form";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ReactSelect } from "@/components/ui/forms";
import { SKILLS } from "@/data/skills";
export default function SkillsInformation() {
	const { control } = useFormContext();

	return (
		<div className="flex justify-center">
			<Card className="w-full border-0 shadow-none lg:w-1/3">
				<CardHeader className="mb-5">
					<CardTitle className="text-2xl">Create your profile</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div>
						<ReactSelect
							label="Skills"
							control={control}
							name="skills"
							options={SKILLS}
							isLoading={false}
							isDisabled={false}
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
