import { Skeleton } from "./index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

interface ITableSkeleton {
	columns?: number;
	rows?: number;
}

export function TableSkeleton({ columns = 7, rows = 14 }: ITableSkeleton) {
	return (
		<div className="rounded-md border p-5">
			{/* search, filter simulation */}
			<div className="flex justify-between px-3 py-4">
				{/* <div className="justify-between px-3 py-4 hidden"> */}
				<div>
					<Skeleton className="h-7 w-48" />
				</div>
				<div>
					<div className="flex justify-evenly gap-2">
						<Skeleton className="h-7 w-32" />
						<Skeleton className="h-7 w-32" />
					</div>
				</div>
			</div>
			{/* table data display simulation */}
			<Table>
				<TableHeader>
					<TableRow className="flex justify-evenly gap-5">
						{[...Array(columns).keys()].map((item) => {
							return (
								<TableHead
									key={item}
									className="whitespace-nowrap px-3 py-3"
								>
									<Skeleton className="h-6 w-40" />
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(rows).keys()].map((item) => {
						return (
							<TableRow key={item} className="flex gap-5">
								{[...Array(columns).keys()].map((i) => {
									return (
										<TableCell
											key={i}
											className="whitespace-nowrap px-3 py-3"
										>
											<Skeleton className="h-6 w-24" />
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{/* pagination simulation */}
			<div className="flex items-center justify-between py-5 pl-3 pr-5">
				<div className="">
					<Skeleton className="h-8 w-36" />
				</div>
				<div className="">
					<Skeleton className="h-8 w-36" />
				</div>
				<div className="flex items-center gap-4">
					<div className="">
						<Skeleton className="h-8 w-36" />
					</div>
					<div className="flex gap-2">
						{[...Array(5).keys()].map((item) => {
							return <Skeleton key={item} className="h-8 w-10" />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
