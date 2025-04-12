import _ from "lodash";
import { SlidersHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface IProps {
	status: any;
	setStatus?: React.Dispatch<React.SetStateAction<any>>;
	filterStatusData?: any[];
}

export default function DatatableStatusFilterSsr({
	status,
	setStatus,
	filterStatusData = [],
}: IProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Filter
					</span>
					<SlidersHorizontal className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-44" align="end">
				<DropdownMenuLabel>Filter by</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
					{filterStatusData.map((item) => {
						return (
							<DropdownMenuRadioItem
								key={item.value}
								// color={item.color}
								value={item.value}
							>
								{_.lowerCase(item.label)}
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
