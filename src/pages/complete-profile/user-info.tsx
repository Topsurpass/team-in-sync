import { useFormContext } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TextField, TextArea } from "@/components/ui/forms";
import { EXPERIENCE } from "@/lib/constants";
import EventFileUpload from "./profile-pic-upload";
import useGetRoles from "@/api/roles/use-get-roles";
import { ReactSelect } from "@/components/ui/forms";
import useGetProfile from "@/api/profile/use-get-profile";

const initialState = {
	result: {} as File,
	preview: "",
	hasFile: false,
	error: [],
};

export default function UserInformation() {
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
	const { data: profile } = useGetProfile();

	const formattedRoles = useMemo(
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

	useEffect(() => {
		const profileData = (profile as any)?.data;
		if (profileData) {
			setValue("full_name", profileData.full_name);
			setValue("bio", profileData.bio);
			setValue("experience_level", {
				value: profileData.experience_level,
				label: profileData.experience_level,
			});
			setValue("role", {
				value: profileData.role.id,
				label: profileData.role.name,
			});

			if (profileData.profile_picture_url) {
				const fetchImageAsFile = async () => {
					const response = await fetch(profileData.profile_picture_url);
					const blob = await response.blob();
					const file = new File([blob], "profile-picture.jpg", {
						type: blob.type,
					});

					const previewURL = URL.createObjectURL(file);
					setFile({
						result: file,
						preview: previewURL,
						hasFile: true,
						error: [],
					});
					setValue("profile_picture", file);
				};

				fetchImageAsFile();
			}
		}
	}, [profile, setValue]);

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
				<CardContent className="mt-5 grid w-full gap-4">
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
							options={formattedRoles}
							isLoading={isLoading}
							isDisabled={isLoading}
							placeholder="Select your skills"
						/>
					</div>
					<div>
						<ReactSelect
							label="Experience Level"
							name="experience_level"
							options={EXPERIENCE}
							control={control}
							isLoading={isLoading}
							isDisabled={isLoading}
							className="py-5"
							placeholder="Select your experience level"
						/>
					</div>
					<div>
						<TextArea control={control} name="bio" label="Bio" rows={5} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
