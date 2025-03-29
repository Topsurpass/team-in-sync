import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectListProps } from "@/types/project-list";

type ProjectProps = {
	project: ProjectListProps;
	maxVisibleMembers: number;
};

export default function ProjectListCard({ project, maxVisibleMembers }: ProjectProps) {
	const extraMembers = project.members.length - maxVisibleMembers;

	const statusColors: Record<string, string> = {
		Ongoing: "bg-blue-100 text-blue-600 text-xs",
		Completed: "bg-green-100 text-green-600 text-xs",
		Pending: "bg-yellow-100 text-yellow-600 text-xs",
	};

	return (
		<Card className="flex min-h-[200px] w-full flex-col border shadow-md">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
				<CardDescription
					className={`flex w-fit justify-center rounded-xl px-3 py-1 text-sm font-medium ${statusColors[project.status] || "bg-gray-100 text-black"}`}
				>
					{project.status}
				</CardDescription>
			</CardHeader>
			<CardContent className="grid flex-1 gap-2 py-2">
				<div>
					<h2 className="text-lg font-medium">About Project</h2>
					<p className="text-sm text-gray-600">
						{project.description.length > 100
							? project.description.slice(0, 100) + "..."
							: project.description}
					</p>
				</div>
				<div>
					<h2 className="text-lg font-medium">Looking For</h2>
					<p className="text-sm text-gray-600">
						{project.profession.length > 4
							? project.profession.slice(0, 2).join(", ") + ", ..."
							: project.profession.join(", ")}
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div className="flex -space-x-2">
					{project.members.slice(0, maxVisibleMembers).map((member, idx) => (
						<img
							key={idx}
							alt={member.name}
							src={member.avatar}
							className="inline-block size-8 rounded-full ring-2 ring-white"
						/>
					))}
					{extraMembers > 0 && (
						<div className="flex size-8 items-center justify-center rounded-full bg-gray-300 text-sm text-white ring-2 ring-white">
							+{extraMembers}
						</div>
					)}
				</div>
				<Button className="rounded-3xl bg-blue-500 p-2 text-xs text-white">
					View Details
				</Button>
			</CardFooter>
		</Card>
	);
}
