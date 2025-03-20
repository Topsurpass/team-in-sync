import { useFormContext } from "react-hook-form";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TextField, SelectField } from "@/components/ui/forms";
import { EXPERIENCE } from "@/lib/constants";

export default function ExperienceInformation() {
	const { control } = useFormContext();

	return (
		<div className="flex justify-center">
			<Card className="w-full border-0 shadow-none lg:w-1/3">
				<CardHeader className="mb-5 mt-8">
					<CardTitle className="text-2xl">Create your profile</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div>
						<TextField
							label="Profile Picture"
							name="profile_pic"
							control={control}
							type="file"
							placeholder="Type your role"
						/>
					</div>
					<div>
						<TextField
							label="Role"
							name="role"
							control={control}
							placeholder="Type your role"
						/>
					</div>
					<div>
						<SelectField
							label="Experience Level"
							name="experience_level"
							options={EXPERIENCE}
							control={control}
							className="py-5"
							placeholder="Select your experience level"
						/>
					</div>
					<div>
						<TextField
							label="Portfolio Link"
							name="portfolio_link"
							control={control}
							iconPosition="left"
							placeholder="Type your portfolio link"
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4"></CardFooter>
			</Card>
		</div>
	);
}
