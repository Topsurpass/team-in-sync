import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField } from "@/components/ui/forms";

export default function SocialLinks() {
	const { control } = useFormContext();

	return (
		<div className="flex w-full justify-center">
			<Card className="w-full border-0 shadow-none">
				<CardHeader className="mb-5">
					<CardTitle className="text-xl md:text-2xl">
						Create your profile
					</CardTitle>
				</CardHeader>
				<CardContent className="grid w-full gap-4">
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
