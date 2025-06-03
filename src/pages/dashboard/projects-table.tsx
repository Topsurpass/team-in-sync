import { View } from "lucide-react";
import { PaginationState, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import DataTableSSR from "@/components/table/datatable-ssr-card";
import { projectData } from "@/data/project-data";
import ProjectSheet from "./project-sheet";
import { Badge } from "@/components/ui/badge";

export default function ProjectTable() {
	const [status, setStatus] = useState(true);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});
	const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
	const [sheetOpen, setSheetOpen] = useState(false);

	const handleOpenSheet = (id: string) => {
		setSelectedProjectId(id);
		setSheetOpen(true);
	};

	const totalRecords = projectData?.length || 0;

	const filteredData = useMemo(() => {
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		// Ensure data is an array before slicing
		return Array.isArray(projectData) ? projectData.slice(start, end) : [];
	}, [pageIndex, pageSize, projectData]);

	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

	const statusColors: Record<string, string> = {
		Ongoing: "bg-blue-100 text-blue-600 text-xs",
		Completed: "bg-green-100 text-green-600 text-xs",
		Pending: "bg-yellow-100 text-yellow-600 text-xs",
	};

	const filterStatusData = [
		{ label: "Pending", value: "pending" },
		{ label: "Ongoing", value: "ongoing" },
		{ label: "Completed", value: "completed" },
	];

	const columns = useMemo(
		() => [
			{
				accessorKey: "title",
				header: "Job Title",
				cell: (info: any) => <p className="text-gray-800">{info.getValue()}</p>,
			},
			{
				accessorKey: "status",
				header: "Status",
				cell: (info) => {
					const status = info.getValue();
					const badgeColor = statusColors[status];
					return <Badge className={`${badgeColor}`}>{status}</Badge>;
				},
			},
			{
				accessorKey: "description",
				header: "Description",
				cell: (info) => {
					const description = info.getValue();
					return (
						<div>
							<h2 className="text-sm">About Project</h2>
							<p className="text-xs text-gray-600">
								{description.length > 100
									? description.slice(0, 100) + "..."
									: description}
							</p>
						</div>
					);
				},
			},
			{
				accessorKey: "profession",
				header: "Profession",
				cell: (info) => {
					const projects = info.getValue();
					return (
						<div>
							<h2 className="text-sm">Looking for</h2>
							<p className="text-xs text-gray-600">
								{projects.length > 4
									? projects.slice(0, 2).join(", ") + ", ..."
									: projects.join(", ")}
							</p>
						</div>
					);
				},
			},
			{
				accessorKey: "members",
				header: "members",
				cell: (info) => {
					const members = info.getValue();
					const extraMembers = members.length - 4;
					const row = info.row.original;

					return (
						<div className="flex items-center justify-between">
							<div className="flex -space-x-2">
								{members
									.slice(0, 4)
									.map(
										(
											member: { name: string; avatar: string },
											idx: number
										) => (
											<img
												key={idx}
												alt={member.name}
												src={member.avatar}
												className="inline-block size-8 rounded-full ring-2 ring-white"
											/>
										)
									)}
								{extraMembers > 0 && (
									<div className="flex size-8 items-center justify-center rounded-full bg-gray-300 text-sm text-white ring-2 ring-white">
										+{extraMembers}
									</div>
								)}
							</div>
							<View
								className="cursor-pointer text-2xl text-black"
								onClick={() => handleOpenSheet(row.id)}
							/>
						</div>
					);
				},
			},
		],
		[]
	);

	return (
		<section className="w-full">
			<div className="">
				<div className="w-full overflow-hidden">
					<DataTableSSR
						data={filteredData}
						columns={columns}
						totalRecords={totalRecords}
						pagination={pagination}
						showColumnVisibility
						columnVisibility={columnVisibility}
						setColumnVisibility={setColumnVisibility}
						setPagination={setPagination}
						filterStatusData={filterStatusData}
						showPagination
						status={status}
						setStatus={setStatus}
						isLoading={false}
						pageSizeOptions={[5, 10, 15, 20, 30, 50]}
						pageCount={Math.ceil(totalRecords / pageSize)}
						numOfSkeletonColumns={7}
						numOfSkeletonRows={4}
					/>
					{selectedProjectId && (
						<ProjectSheet
							projectId={selectedProjectId}
							open={sheetOpen}
							onOpenChange={(open) => {
								setSheetOpen(open);
								if (!open) setSelectedProjectId(null);
							}}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
