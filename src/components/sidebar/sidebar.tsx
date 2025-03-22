import classNames from "classnames";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import SideBarMenuGroup from "@/components/sidebar/sidebar-menu-group";
import SIDENAV_ITEMS from "@/routes/menu-list";
import { cn } from "@/lib/utils";
import { SideNavItem } from "@/types/sidenav-item";

function SideBar() {
	const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();

	const sidebarToggle = () => {
		invokeToggleCollapse();
	};

	const asideStyle = classNames(
		"bg-white fixed top-0 bottom-0 left-0 text-white border rounded-xl transition-all duration-300 ease-in-out z-[50] overflow-y-auto",
		{
			"w-[20rem]": !toggleCollapse,
			"w-[5.4rem] sm:left-0 left-[-100%]": toggleCollapse,
		}
	);

	return (
		<aside className={asideStyle}>
			<button
				type="button"
				onClick={sidebarToggle}
				aria-label="sidebar-toggle"
				className="absolute right-0 top-3 -mt-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-100 ease-in-out"
			>
				{toggleCollapse ? (
					<IoArrowForward size={20} />
				) : (
					<IoArrowBack size={20} />
				)}
			</button>

			<nav
				className={cn(
					"flex flex-col gap-2 text-black transition-all duration-300 ease-in-out dark:text-white"
				)}
			>
				<div className="flex flex-col gap-5 px-4 pt-10">
					{SIDENAV_ITEMS.map((item: SideNavItem) => (
						<SideBarMenuGroup key={item.title} menuGroup={item} />
					))}
				</div>
			</nav>
		</aside>
	);
}

export default SideBar;
