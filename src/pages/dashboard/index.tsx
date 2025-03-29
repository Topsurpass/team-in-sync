import { useState } from "react";
import ProjectListCard from "./project-cards";
import { projectData } from "@/data/project-data";
import Pagination from "@/components/pagination";

export default function Dashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	const totalItems = projectData.length;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedProjects = projectData.slice(startIndex, startIndex + itemsPerPage);

	return (
		<div>
			<div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-3">
				{paginatedProjects.map((project) => (
					<ProjectListCard
						key={project.id}
						project={project}
						maxVisibleMembers={2}
					/>
				))}
			</div>

			<Pagination
				totalItems={totalItems}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
