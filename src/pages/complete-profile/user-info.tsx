import { useFormContext } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField, SelectField, TextArea } from "@/components/ui/forms";
import { EXPERIENCE } from "@/lib/constants";
import EventFileUpload from "./profile-pic-upload";
import useGetRoles from "@/api/roles/use-get-roles";
import { ReactSelect } from "@/components/ui/forms";

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
	const [file, setFile] = useState<any>(initialState);
	const { data, isLoading } = useGetRoles();

	const formattedSkills = useMemo(
		() =>
			(data as any)?.data?.map((role: any) => ({
				value: role.id,
				label: role.name,
			})) || [],
		[data]
	);

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
						<ReactSelect
							label="Role"
							control={control}
							name="role"
							options={formattedSkills}
							isLoading={isLoading}
							isDisabled={isLoading}
							placeholder="Select your skills"
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
						<TextArea control={control} name="bio" label="Bio" rows={2} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
