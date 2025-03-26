import { useMemo } from "react";
import { UploadCloud, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useEventUpload from "@/hooks/use-picture-upload";
import { IProfilePicFileUpload } from "@/types";

export default function EventFileUpload({
	file,
	setFile,
	resetFile,
	error,
}: IProfilePicFileUpload) {
	const { isDragActive, getRootProps, getInputProps } = useEventUpload({ setFile });

	const ContentBeforeFileSelected = useMemo(
		() =>
			!isDragActive && !file?.hasFile ? (
				<div className="flex flex-col items-center justify-center">
					<div className="relative flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gray-200 text-center text-sm">
						<UploadCloud size={25} color="gray" />
						<span>Upload photo</span>
					</div>
				</div>
			) : null,
		[isDragActive, file?.hasFile]
	);

	const ContentAfterFileSelected = useMemo(
		() =>
			file?.hasFile ? (
				<div className="relative">
					<Avatar className="h-20 w-20 rounded-full border">
						<AvatarImage src={file?.preview} alt="Uploaded Image" />
					</Avatar>
					<button
						type="button"
						className="absolute right-0 top-0 mr-6 rounded-full bg-gray-500 p-1 text-white"
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							resetFile();
						}}
						aria-label="Remove Image"
					>
						<XCircle size={20} />
					</button>
				</div>
			) : null,
		[file, resetFile]
	);

	return (
		<div className="flex flex-col">
			<div
				{...getRootProps({
					className: cn(
						"relative flex items-center justify-center rounded-full cursor-pointer",
						"w-20 h-20 bg-gray-100 border border-gray-300 overflow-hidden"
					),
				})}
			>
				<label
					htmlFor="file"
					className="flex h-full w-full cursor-pointer items-center justify-center"
				>
					{ContentBeforeFileSelected}
					<input
						id="fileUpload"
						type="file"
						name="profile_picture"
						className="sr-only cursor-pointer"
						{...getInputProps()}
					/>
				</label>
				{ContentAfterFileSelected}
			</div>
			{/* Single error display from form validation */}
			{error?.message && (
				<h4 className="mt-2 text-sm text-red-600">{error.message}</h4>
			)}
		</div>
	);
}
