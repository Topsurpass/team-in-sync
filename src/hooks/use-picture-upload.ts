import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IProfilePicFileUpload } from "@/types";

/**
 * 1kb = 1024 bytes
 * 1mb = 1024 * 1000 * 1
 */
const MAX_FILE_SIZE = 1024 * 1000 * 10; // 10mb
const FILE_ERROR_MESSAGE = "File size is larger than 10MB (megabytes) ";

function fileValidator(file: any) {
	if (file.size > MAX_FILE_SIZE) {
		return {
			code: "File is too large",
			message: FILE_ERROR_MESSAGE,
		};
	}
	return null;
}

export default function useEventUpload({
	setFile,
}: Omit<IProfilePicFileUpload, "resetFile" | "file">) {
	/**
	 *
	 */
	const onDrop = useCallback(
		(acceptedFiles: any, rejectedFiles: any) => {
			if (acceptedFiles?.length) {
				setFile((prev: any) => ({
					...prev,
					result: acceptedFiles[0],
					preview: URL.createObjectURL(acceptedFiles[0]),
					hasFile: true,
					error: [],
				}));
			}
			if (rejectedFiles?.length) {
				setFile((prev: any) => ({ ...prev, error: rejectedFiles }));
			}
		},
		[setFile]
	);

	/**
	 * useDropZone methods
	 */
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".png"],
		},
		validator: fileValidator,
	});

	return {
		getInputProps,
		getRootProps,
		isDragActive,
	};
}
