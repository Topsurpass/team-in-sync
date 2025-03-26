export interface IProfilePicFileUpload {
	file: any;
	setFile: React.Dispatch<React.SetStateAction<any>>;
	resetFile: () => void;
	error?: { message: string };
}
