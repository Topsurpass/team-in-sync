import { useEffect, useState } from "react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	OnChangeFn,
	PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import {
	//Table,
	//TableBody,
	//TableCell,
	TableFooter,
	TableHead,
	//TableHeader,
	TableRow,
} from ".";
import { TableSkeleton } from "../skeleton/table-skeleton-card";
import DataTablePagination from "./datatable-pagination";
import DatatableSearchInputSSR from "./datatable-search-input";
import DatatableStatusFilterSsr from "./datatable-status-filter-ssr";
import DatatableViewOptions from "./datatable-view-options";

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
	showPagination?: boolean;
	showColumnVisibility?: boolean;
}

export default function DataTableSSR<TData, TValue>(
	props: DataTableProps<TData, TValue>
) {
	const {
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
		showPagination,
		showColumnVisibility = false,
	} = props;

	const [globalFilter, setGlobalFilter] = useState("");

	const table = useReactTable({
		data,
		columns,
		state: {
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
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		autoResetPageIndex: false,
	});

	useEffect(() => {
		if (setSearchText) {
			setSearchText(globalFilter);
		}
	}, [globalFilter, setSearchText]);

	return isLoading ? (
		<TableSkeleton columns={numOfSkeletonColumns} rows={numOfSkeletonRows} />
	) : (
		<div className="min-w-full space-y-5 overflow-x-auto">
			<div className="rounded-md py-3">
				<div className="mb-4 flex flex-wrap gap-2 md:flex-nowrap md:items-center md:justify-end">
					{isSearchable && (
						<div className="w-full">
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
					{showColumnVisibility && <DatatableViewOptions table={table} />}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
					{table?.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<div
								key={row.id}
								className="rounded-md border bg-white p-4 shadow"
							>
								{row.getVisibleCells().map((cell) => (
									<div key={cell.id} className="mb-2">
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</div>
								))}
							</div>
						))
					) : (
						<div className="col-span-full text-center uppercase">
							No results
						</div>
					)}
				</div>

				{showFooter && data?.length > 10 && (
					<TableFooter>
						{table?.getFooterGroups()?.map((footerGroup) => (
							<TableRow key={footerGroup.id}>
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
				<div className="py-5">
					{showPagination && (
						<DataTablePagination
							totalRecords={totalRecords}
							table={table}
							pageSizeOptions={pageSizeOptions}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
