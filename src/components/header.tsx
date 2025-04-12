import { useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { cn } from "../lib/utils";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { ProfilePicture } from "./avatar";
import { Button } from "@/components/ui/button";
import useGetProfile from "@/api/profile/use-get-profile";

export default function Header() {
	const navigate = useNavigate();
	const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
	const { data } = useGetProfile();

	const user = (data as any)?.data;
	const sidebarToggle = () => {
		invokeToggleCollapse();
	};

	const headerStyle = cn(
		"bg-sidebar fixed top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm shadow-slate-500/40 transition-all duration-300 ease-in-out",
		{
			"sm:pl-[18rem]": !toggleCollapse,
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
				<div className="order-1 flex w-full items-center justify-between gap-5 px-2 sm:order-2 md:gap-10">
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
					<Button
						className="hidden flex-none rounded-3xl sm:flex"
						onClick={() => navigate("/project/new")}
					>
						Create project
					</Button>
				</div>
			</div>
		</header>
	);
}
