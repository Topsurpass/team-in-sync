import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { TextField, TextArea } from "@/components/ui/forms";
import { EXPERIENCE } from "@/lib/constants";
import EventFileUpload from "../complete-profile/profile-pic-upload";
import useGetRoles from "@/api/roles/use-get-roles";
import { ReactSelect } from "@/components/ui/forms";
import useGetProfile from "@/api/profile/use-get-profile";
import { Button } from "@/components/ui/button";
import { UserDetailsInputs, userDetailsSchema } from "@/validations/profile-schema";
import useProfileUpdate from "@/api/authentication/use-profile-update";
import QueryKeys from "@/api/query-keys";

const initialState = {
	result: {} as File,
	preview: "",
	hasFile: false,
	error: [],
};

export default function Overview() {
	const {
		control,
		setValue,
		trigger,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<UserDetailsInputs>({
		defaultValues: {
			full_name: "",
			bio: "",
			profile_picture: undefined,
			experience_level: undefined,
			role: undefined,
		},
		resolver: zodResolver(userDetailsSchema),
	});

	const [file, setFile] = useState<any>(initialState);
	const [isEditing, setIsEditing] = useState(false);
	const { data, isLoading } = useGetRoles();
	const { data: profile } = useGetProfile();
	const { mutate: updateProfile, isPending } = useProfileUpdate();
	const queryClient = useQueryClient();
	const profilePic = watch("profile_picture");

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
					let imageUrl = profileData.profile_picture_url;
					if (imageUrl.startsWith("http://")) {
						imageUrl = imageUrl.replace("http://", "https://");
					}

					try {
						const response = await fetch(imageUrl);
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
					} catch (error) {
						return error;
					}
				};

				fetchImageAsFile();
			}
		}
	}, [profile, setValue]);
	useEffect(() => {
		if (file?.hasFile) {
			setValue("profile_picture", file.result);
			trigger("profile_picture");
		}
	}, [file, setValue, trigger]);

	const resetFile = () => {
		setFile(initialState);
		setValue("profile_picture", "");
	};

	const formattedRoles = useMemo(
		() =>
			(data as any)?.data?.map((role: any) => ({
				value: role.id,
				label: role.name,
			})) || [],
		[data]
	);

	const processForm: SubmitHandler<UserDetailsInputs> = async (data) => {
		const formData: any = new FormData();
		formData.append("profile_picture", data?.profile_picture);
		formData.append("role", data?.role.value);
		formData.append("bio", data?.bio);
		formData.append("full_name", data?.full_name);
		formData.append("experience_level", data?.experience_level.value);
		updateProfile(formData, {
			onSuccess: () => {
				toast.success(`Profile Updated!`, {
					description: "User Information updated",
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
		<div className="flex w-full justify-center">
			<form className="w-full">
				<Card className="w-full border-0 shadow-none">
					<CardContent className="mt-5 grid w-full gap-3">
						<div className="flex items-center justify-between">
							<EventFileUpload
								resetFile={resetFile}
								file={file}
								setFile={setFile}
								error={errors.profile_picture as any}
							/>
							<Button
								type="button"
								onClick={() => setIsEditing(true)}
								className="flex gap-2 rounded-3xl border border-royal text-royal"
								variant="outline"
							>
								<CiEdit size={20} /> Edit
							</Button>
						</div>

						<TextField
							label="Full Name"
							name="full_name"
							control={control}
							placeholder="First Name - Last Name"
							disabled={!isEditing}
						/>

						<ReactSelect
							label="Role"
							control={control}
							name="role"
							options={formattedRoles}
							isLoading={isLoading}
							isDisabled={!isEditing || isLoading}
							placeholder="Select your skills"
						/>

						<ReactSelect
							label="Experience Level"
							name="experience_level"
							options={EXPERIENCE}
							control={control}
							isLoading={isLoading}
							isDisabled={!isEditing || isLoading}
							className="py-5"
							placeholder="Select your experience level"
						/>

						<TextArea
							control={control}
							name="bio"
							label="Bio"
							rows={5}
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
			</form>
		</div>
	);
}
