import ReusableSheet from "@/components/sheet";
import { projectData } from "@/data/project-data";
import { Button } from "@/components/ui/button";

interface ProjectSheetProps {
	projectId: string | null | number;
	open: boolean;
	onOpenChange: (_open: boolean) => void;
}

export default function ProjectSheet({
	projectId,
	open,
	onOpenChange,
}: ProjectSheetProps) {
	const project = projectData.find((p) => p.id === projectId);
	if (!project) return null;

	return (
		<ReusableSheet
			open={open}
			onOpenChange={onOpenChange}
			title="Project Details"
			description={`Full details of ${project.title}`}
			className="border-gray-600 bg-gray-200 px-5 py-3 text-gray-800"
		>
			<div className="space-y-5 px-5 text-sm text-gray-700">
				<div>
					<p className="font-bold">Title</p>
					<p>{project.title}</p>
				</div>
				<div>
					<p className="font-bold">Status</p>
					<p>{project.status}</p>
				</div>
				<div>
					<p className="font-bold">Description</p>
					<p>{project.description}</p>
				</div>

				<p>
					<strong>Profession:</strong> {project.profession.join(", ")}
				</p>
				<p>
					<strong>Team:</strong>
				</p>
				<div className="space-y-3 border bg-gray-100 p-3">
					{project.members.map((m, idx) => (
						<div key={idx} className="flex items-center gap-2">
							<img
								key={idx}
								alt={m.name}
								src={m.avatar}
								className="inline-block size-8 rounded-full ring-2 ring-white"
							/>

							<div>
								<p className="font-bold">{m.name}</p>
								<p className="text-xs">{m.role}</p>
							</div>
						</div>
					))}
				</div>
				<div className="flex w-full">
					<Button className="m-auto w-2/3 rounded-full" size={"lg"}>
						Request to Join
					</Button>
				</div>
			</div>
		</ReusableSheet>
	);
}
