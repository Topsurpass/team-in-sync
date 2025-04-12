// import { PopoverClose } from "@radix-ui/react-popover";
import { Table } from "@tanstack/react-table";
import { Settings2, XCircle } from "lucide-react";

import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button/index";

interface IProps<TData> {
	table: Table<TData>;
}

export default function DatatableViewOptions<TData>({ table }: IProps<TData>) {
	return (
		<Popover>
			<PopoverTrigger asChild className="flex">
				<Button
					variant="outline"
					type="button"
					// size="sm"
					// className="ml-auto hidden h-8 lg:flex"
				>
					<Settings2 className="mr-2 h-4 w-4" />
					<span>Column</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end">
				<div className="mb-3 flex items-center justify-between">
					<p className="font-semibold">Table Columns</p>
					<PopoverClose asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 rounded-full"
						>
							<XCircle />
						</Button>
					</PopoverClose>
				</div>
				{table
					.getAllColumns()
					?.filter(
						(column: any) =>
							typeof column.accessorFn !== "undefined" &&
							column.getCanHide()
					)
					.map((column: any) => {
						return (
							<div key={column.id} className="px-1">
								<label>
									<input
										{...{
											type: "checkbox",
											checked: column.getIsVisible(),
											onChange: column.getToggleVisibilityHandler(),
										}}
									/>{" "}
									{column.columnDef.accessorKey}
								</label>
							</div>
						);
					})}
			</PopoverContent>
		</Popover>
	);
}
