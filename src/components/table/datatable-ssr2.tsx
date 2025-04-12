import { useEffect, useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import {
	ColumnDef,
	// ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	// getFacetedRowModel,
	// getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	OnChangeFn,
	PaginationState,
	// SortingState,
	useReactTable,
	// VisibilityState,
} from "@tanstack/react-table";
// import { RefreshCw } from "lucide-react";
// import QueryKeys from "@/api/query-keys";
// import { FilterStatus } from "@/types/enum";
// import { cn } from "@/lib/utils.ts";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./index2";
// import { Button } from "../button";
import { TableSkeleton } from "../skeleton/table-skeleton";
import DataTablePagination from "./datatable-pagination";
import DatatableSearchInputSSR from "./datatable-search-input";
import DatatableStatusFilterSsr from "./datatable-status-filter-ssr";
import DatatableViewOptions from "./datatable-view-options";
// import DatatableViewOptions from "./datatable-view-options";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination: any;
	pageCount: number;
	totalRecords: number;
	pageSizeOptions: number[];
	isLoading?: boolean;
	isSearchable?: boolean;
	showFooter?: boolean;
	setPagination: OnChangeFn<PaginationState>;
	setSearchText?: React.Dispatch<React.SetStateAction<string>>;
	columnVisibility?: any;
	setColumnVisibility?: any;
	setStatus?: React.Dispatch<React.SetStateAction<any>>;
	status?: any;
	showFilter?: boolean;
	numOfSkeletonColumns?: number;
	numOfSkeletonRows?: number;
	filterStatusData?: any[];
}

export default function DataTableSSR<TData, TValue>({
	columns,
	data,
	pagination,
	setPagination,
	setSearchText,
	pageCount,
	totalRecords,
	pageSizeOptions,
	isLoading = false,
	isSearchable = true,
	showFooter = false,
	columnVisibility,
	setColumnVisibility,
	setStatus = undefined,
	status = undefined,
	filterStatusData,
	showFilter = true,
	numOfSkeletonColumns = 7,
	numOfSkeletonRows = 14,
}: DataTableProps<TData, TValue>) {
	const [globalFilter, setGlobalFilter] = useState("");

	const table = useReactTable({
		data,
		columns,
		state: {
			// sorting,
			// rowSelection,
			// columnFilters,
			columnVisibility,
			globalFilter,
			pagination,
		},
		pageCount,
		onPaginationChange: setPagination,
		onGlobalFilterChange: setGlobalFilter,
		enableRowSelection: true,
		manualPagination: true,
		manualFiltering: true,
		// onRowSelectionChange: setRowSelection,
		// onSortingChange: setSorting,
		// onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		autoResetPageIndex: false,
		// getFacetedRowModel: getFacetedRowModel(),
		// getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	useEffect(() => {
		table.resetPageIndex(true);
	}, [table, pagination.pageSize, globalFilter, status]);

	useEffect(() => {
		if (setSearchText) {
			setSearchText(globalFilter);
		}
	}, [globalFilter, setSearchText]);

	//   const refresh = () => {
	//     queryClient.invalidateQueries({ queryKey: [refreshKey] });
	//   };

	return isLoading ? (
		<TableSkeleton columns={numOfSkeletonColumns} rows={numOfSkeletonRows} />
	) : (
		<div className="min-w-full space-y-5 overflow-x-auto">
			<div className="rounded-md border px-4 py-3">
				{/* other goes here */}
				<div className="mb-4 flex items-center justify-end gap-3">
					{isSearchable && (
						<div className="w-2/5">
							<DatatableSearchInputSSR
								placeholder="Search..."
								value={globalFilter?.trim() ?? ""}
								onChange={(value) => setGlobalFilter(String(value))}
								debounce={1000}
							/>
						</div>
					)}
					{showFilter && (
						<DatatableStatusFilterSsr
							status={status}
							setStatus={setStatus}
							filterStatusData={filterStatusData}
						/>
					)}
					<DatatableViewOptions table={table} />
				</div>

				<Table className="min-w-full table-auto border">
					<TableHeader className="bg-gray-100">
						{table?.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="">
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										className="font-medium text-black"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table?.getRowModel().rows?.length ? (
							table?.getRowModel()?.rows?.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											className="cursor-pointer"
											key={cell.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns?.length}
									className="h-80 text-center uppercase"
								>
									No results
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					{showFooter && data?.length > 10 && (
						<TableFooter>
							{table?.getFooterGroups()?.map((footerGroup) => (
								<TableRow key={footerGroup.id} className="">
									{footerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableFooter>
					)}
				</Table>
				<div className="py-5">
					<DataTablePagination
						totalRecords={totalRecords}
						table={table}
						pageSizeOptions={pageSizeOptions}
					/>
				</div>
			</div>
		</div>
	);
}
