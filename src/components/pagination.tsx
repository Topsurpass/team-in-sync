import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (_page: number) => void;
}

const getVisiblePages = (
	currentPage: number,
	totalPages: number
): (number | string)[] => {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const visiblePages: (number | string)[] = [1, 2];

	if (currentPage > 3) {
		visiblePages.push("...");
	}

	if (currentPage > 2 && currentPage < totalPages) {
		visiblePages.push(currentPage);
	}

	if (currentPage < totalPages - 1) {
		visiblePages.push("...");
	}

	visiblePages.push(totalPages);

	const filteredPages: (number | string)[] = [];
	let prev: number | string | null = null;

	for (const page of visiblePages) {
		if (page === "..." && prev === "...") continue;
		filteredPages.push(page);
		prev = page;
	}

	return filteredPages;
};

export default function Pagination({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return (
		<div className="mt-2 flex items-center justify-between border-y border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div className="flex flex-1 items-center justify-between">
				<p className="text-sm text-gray-700">
					Showing{" "}
					<span className="font-medium">
						{(currentPage - 1) * itemsPerPage + 1}
					</span>{" "}
					to{" "}
					<span className="font-medium">
						{Math.min(currentPage * itemsPerPage, totalItems)}
					</span>{" "}
					of <span className="font-medium">{totalItems}</span> results
				</p>
				<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
					<button
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-royal-light disabled:opacity-50"
					>
						<FaChevronLeft className="size-5" />
					</button>

					{getVisiblePages(currentPage, totalPages).map((page, index) => {
						if (page === "...") {
							return (
								<span
									key={`ellipsis-${index}`}
									className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
								>
									...
								</span>
							);
						}

						const pageNumber = page as number;
						return (
							<button
								key={pageNumber}
								onClick={() => onPageChange(pageNumber)}
								className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
									currentPage === pageNumber
										? "bg-royal text-white"
										: "text-gray-900 ring-1 ring-gray-300 hover:bg-royal-light"
								}`}
							>
								{pageNumber}
							</button>
						);
					})}

					<button
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-royal-light disabled:opacity-50"
					>
						<FaChevronRight className="size-5" />
					</button>
				</nav>
			</div>
		</div>
	);
}
