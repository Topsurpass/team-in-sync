import { useState, useCallback } from "react";
import { MdOutlineTune } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { cn } from "../lib/utils";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { ProfilePicture } from "./avatar";
import DatatableSearchInput from "./data-search-input";
import { Button } from "@/components/ui/button";

export default function Header() {
	const [searchTerm, setSearchTerm] = useState("");
	const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
	const sidebarToggle = () => {
		invokeToggleCollapse();
	};

	const handleSearchChange = useCallback((value: string | number) => {
		const searchValue = value.toString();
		setSearchTerm(searchValue);
	}, []);
	const headerStyle = cn(
		"bg-sidebar fixed top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm shadow-slate-500/40 transition-all duration-300 ease-in-out",
		{
			"sm:pl-[20rem]": !toggleCollapse,
			"sm:pl-[5.6rem]": toggleCollapse,
		}
	);

	return (
		<header className={headerStyle}>
			<div className="flex h-16 items-center">
				<button
					type="button"
					onClick={sidebarToggle}
					aria-label="sidebar"
					className="shrink-btn text-sidebar-muted-foreground order-2 float-right flex h-[40px] w-[40px] items-center justify-center rounded-md shadow-md transition duration-300 ease-in-out sm:order-1 sm:hidden"
				>
					<BsList />
				</button>
				<div className="order-1 flex w-full items-center gap-5 px-2 sm:order-2 md:justify-between md:gap-10">
					<div className="flex flex-none items-center gap-2">
						<ProfilePicture />
						<p className="hidden text-gray-700 sm:flex">Admin User</p>
					</div>
					<div className="rounded-md border border-gray-300 md:flex-1">
						<DatatableSearchInput
							value={searchTerm}
							onChange={handleSearchChange}
							debounce={500}
							placeholder="Search..."
							className="border-0"
						/>
					</div>

					<div className="flex flex-none items-center gap-2">
						<p className="text-gray-700">Filter</p>
						<MdOutlineTune size={20} />
					</div>
					<Button className="hidden flex-none rounded-3xl sm:flex">
						Create project
					</Button>
				</div>
			</div>
		</header>
	);
}
