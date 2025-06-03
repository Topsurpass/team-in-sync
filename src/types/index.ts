import { EntityType } from "./enum";
export interface State {
	isModalOpen: boolean;
	formData: Record<string, any>;
	isEdit: boolean;
	isViewMore: boolean;
	entity: EntityType | string;
}

export type Action =
	| { type: "OPEN_MODAL"; payload: EntityType }
	| { type: "CLOSE_MODAL" }
	| { type: "SET_EDIT_MODE"; payload: Record<string, any> }
	| { type: "SET_VIEW_MORE_MODE"; payload: Record<string, any> };

export interface IProfilePicFileUpload {
	file: any;
	setFile: React.Dispatch<React.SetStateAction<any>>;
	resetFile: () => void;
	error?: { message: string };
}

export type NotificationType =
	| "project_added"
	| "join_request"
	| "platform_update"
	| "reminder";

export interface Notification {
	id: number;
	type: NotificationType;
	title: string;
	description: string;
	time: string;
}
