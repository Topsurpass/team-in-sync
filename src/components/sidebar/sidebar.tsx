import classNames from "classnames";
import { FiLogOut } from "react-icons/fi";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import SideBarMenuGroup from "@/components/sidebar/sidebar-menu-group";
import SIDENAV_ITEMS from "@/routes/menu-list";
import { SideNavItem } from "@/types/sidenav-item";
import useAuthStore from "@/stores/user-store";

function SideBar() {
	const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
	const logout = useAuthStore((state) => state.reset);

	const sidebarToggle = () => {
		invokeToggleCollapse();
	};

	const asideStyle = classNames(
		"bg-white fixed top-0 bottom-0 left-0 text-white border rounded-xl transition-all duration-300 ease-in-out z-[50] overflow-y-auto flex flex-col overflow-x-hidden",
		{
			"w-[18rem]": !toggleCollapse,
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

			<nav className="flex flex-grow flex-col gap-2 text-black transition-all duration-300 ease-in-out dark:text-white">
				<div className="flex flex-grow flex-col gap-5 px-4 pt-10">
					{SIDENAV_ITEMS.map((item: SideNavItem) => (
						<SideBarMenuGroup key={item.title} menuGroup={item} />
					))}
				</div>
			</nav>

			<button
				onClick={logout}
				className={classNames(
					"mt-auto flex items-center p-4 text-black transition-all duration-300 ease-in-out hover:text-royal",
					{
						"justify-center": toggleCollapse,
						"gap-4 pl-10": !toggleCollapse,
					}
				)}
			>
				<FiLogOut size={20} className="cursor-pointer" />
				{!toggleCollapse && <p className="">Logout</p>}
			</button>
		</aside>
	);
}

export default SideBar;
