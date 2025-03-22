export type ProjectListProps = {
	id: number;
	title: string;
	status: "Ongoing" | "Completed" | "Pending";
	description: string;
	profession: string[];
	date: string;
	members: {
		name: string;
		role: string;
		avatar: string;
	}[];
};
