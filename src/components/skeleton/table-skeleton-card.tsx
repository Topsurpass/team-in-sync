import { Skeleton } from "./index";

interface ITableSkeleton {
	columns?: number; // Columns in each card
	rows?: number; // Total rows/cards to display
}

export function TableSkeleton({ columns = 4, rows = 1 }: ITableSkeleton) {
	return (
		<div className="space-y-4">
			{/* Header skeleton for search, filter, etc. */}
			<div className="flex justify-between px-3 py-4">
				<Skeleton className="h-7 w-48" />
				<div className="flex gap-2">
					<Skeleton className="h-7 w-32" />
					<Skeleton className="h-7 w-32" />
				</div>
			</div>

			{/* Cards skeleton in grid layout */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{[...Array(rows)].map((_, rowIndex) => (
					<div
						key={rowIndex}
						className="space-y-2 rounded-md border bg-white p-4 shadow"
					>
						{[...Array(columns)].map((_, colIndex) => (
							<Skeleton key={colIndex} className="h-6 w-full" />
						))}
					</div>
				))}
			</div>

			{/* Footer skeleton for pagination */}
			<div className="flex items-center justify-between px-3 py-5">
				<Skeleton className="h-8 w-36" />
				<Skeleton className="h-8 w-36" />
				<div className="flex items-center gap-2">
					{[...Array(5)].map((_, index) => (
						<Skeleton key={index} className="h-8 w-10" />
					))}
				</div>
			</div>
		</div>
	);
}
