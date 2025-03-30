import { useState, useCallback } from "react";
import { MdOutlineTune } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsList } from "react-icons/bs";
import { cn } from "../lib/utils";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { ProfilePicture } from "./avatar";
import DatatableSearchInput from "./data-search-input";
import { Button } from "@/components/ui/button";
import { PopoverWrapper } from "@/components/popover";
import { TextField, SelectField } from "@/components/ui/forms";
import { EXPERIENCE } from "@/lib/constants";
import { ProfileInputs, profileSchema } from "@/validations/profile-schema";
import useGetProfile from "@/api/profile/use-get-profile";
import { EntityType } from "@/types/enum";
import useGlobalProvider from "@/hooks/use-global-provider";

const initialValues = {
	experience_level: "",
};

export default function Header() {
	const { onModalOpen } = useGlobalProvider();
	const [searchTerm, setSearchTerm] = useState("");
	const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
	const { data } = useGetProfile();

	const user = (data as any)?.data;
	const sidebarToggle = () => {
		invokeToggleCollapse();
	};

	const { control, handleSubmit } = useForm<ProfileInputs>({
		resolver: zodResolver(profileSchema),
		defaultValues: initialValues,
	});

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
						{user?.profile_picture_url ? (
							<div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
								<img
									src={user?.profile_picture_url}
									alt={user?.full_name}
								/>
							</div>
						) : (
							<ProfilePicture />
						)}
						<p className="hidden text-gray-700 sm:flex">{`${user?.full_name || ""}`}</p>
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
						<PopoverWrapper
							trigger={
								<MdOutlineTune size={20} className="cursor-pointer" />
							}
							className="flex flex-col gap-4 rounded-xl border p-5"
							align="end"
							sideOffset={25}
						>
							<div className="">
								<TextField
									label="Role"
									name="role"
									control={control}
									placeholder="Type your role"
								/>
							</div>
							<div>
								<SelectField
									label="Experience Level"
									name="experience_level"
									options={EXPERIENCE}
									control={control}
									placeholder="Select your experience level"
								/>
							</div>
							<Button
								className="flex-none rounded-3xl sm:flex md:mt-14"
								onClick={() => handleSubmit(() => {})()}
							>
								Apply Filter
							</Button>
						</PopoverWrapper>
					</div>
					<Button
						className="hidden flex-none rounded-3xl sm:flex"
						onClick={() => onModalOpen(EntityType.PROJECT)}
					>
						Create project
					</Button>
				</div>
			</div>
		</header>
	);
}
