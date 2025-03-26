import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField, SelectField } from "@/components/ui/forms";
import { EXPERIENCE } from "@/lib/constants";
import EventFileUpload from "./profile-pic-upload";

const initialState = {
	result: {} as File,
	preview: "",
	hasFile: false,
	error: [],
};

export default function ExperienceInformation() {
	const {
		control,
		setValue,
		watch,
		trigger,
		formState: { errors },
	} = useFormContext();
	const profilePic = watch("profile_picture");
	const githubLink = watch("github_link");
	const linkedinLink = watch("linkedin_link");
	const [file, setFile] = useState<any>(initialState);
	githubLink ? true : false;
	linkedinLink ? true : false;
	const [showGithub, setShowGithub] = useState(githubLink);
	const [showLinkedin, setShowLinkedin] = useState(linkedinLink);

	const handleCloseGitHub = () => {
		setShowGithub(false);
		setValue("github_link", "");
	};
	const handleCloseLinkedin = () => {
		setShowLinkedin(false);
		setValue("linkedin_link", "");
	};

	// Restore image preview when navigating back
	useEffect(() => {
		if (profilePic && profilePic instanceof File) {
			const previewURL = URL.createObjectURL(profilePic);
			setFile({
				result: profilePic,
				preview: previewURL,
				hasFile: true,
				error: [],
			});
		}
	}, [profilePic]);

	const resetFile = () => {
		setFile(initialState);
		setValue("profile_picture", null);
	};

	// Update react-hook-form when file changes
	useEffect(() => {
		if (file?.hasFile) {
			setValue("profile_picture", file.result);
			trigger("profile_picture");
		}
	}, [file, setValue, trigger]);

	return (
		<div className="flex w-full justify-center">
			<Card className="w-full border-0 shadow-none">
				<CardHeader className="mb-5">
					<CardTitle className="text-xl md:text-2xl">
						Create your profile
					</CardTitle>
				</CardHeader>
				<CardContent className="grid w-full gap-4">
					<EventFileUpload
						resetFile={resetFile}
						file={file}
						setFile={setFile}
						error={errors.profile_picture as any}
					/>

					<div className="w-full">
						<TextField
							label="Full Name"
							name="full_name"
							control={control}
							placeholder="First Name - Last Name"
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

					{showGithub ? (
						<div className="flex w-full gap-5">
							<div className="w-full">
								<TextField
									// label="GitHub"
									name="github_link"
									control={control}
									iconPosition="left"
									placeholder="Type your GitHub URL"
								/>
							</div>

							<p
								className="text-bold cursor-pointer text-2xl text-destructive"
								onClick={() => handleCloseGitHub()}
							>
								x
							</p>
						</div>
					) : (
						<div className="flex justify-between">
							<p>Github</p>
							<p
								className="cursor-pointer text-royal"
								onClick={() => setShowGithub(true)}
							>
								Add Link
							</p>
						</div>
					)}

					{showLinkedin ? (
						<div className="flex w-full gap-5">
							<div className="w-full">
								<TextField
									// label="LinkedIn"
									name="linkedin_link"
									control={control}
									iconPosition="left"
									placeholder="Type your LinkedIn URL"
								/>
							</div>

							<p
								className="text-bold cursor-pointer text-2xl text-destructive"
								onClick={() => handleCloseLinkedin()}
							>
								x
							</p>
						</div>
					) : (
						<div className="flex justify-between">
							<p>Linkedin</p>
							<p
								className="cursor-pointer text-royal"
								onClick={() => setShowLinkedin(true)}
							>
								Add Link
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
