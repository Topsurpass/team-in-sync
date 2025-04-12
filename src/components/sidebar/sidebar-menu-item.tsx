import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { MenuList } from "@/types/sidenav-item";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { cn } from "@/lib/utils";

export default function SideBarMenuItem({ item }: { item: MenuList }) {
	const { toggleCollapse, closeSidebarOnMobile } = useSideBarToggle();
	const { pathname } = useLocation();
	const [subMenuOpen, setSubMenuOpen] = useState(false);

	const toggleSubMenu = () => {
		setSubMenuOpen(!subMenuOpen);
	};

	const inactiveLink = cn(
		"flex items-center min-h-[40px] h-full py-2 px-4 hover:text-caution-foreground hover:bg-caution rounded-md transition duration-200",
		{ "justify-center": toggleCollapse }
	);

	const activeLink = cn("bg-royal-light text-royal");

	const navMenuDropdownItem =
		"text-red-500 py-2 px-4 hover:text-caution transition duration-200 rounded-md";

	const dropdownMenuHeaderLink = cn(inactiveLink, {
		"rounded-b-none": subMenuOpen,
		"w-full": true,
	});

	return (
		<div>
			{item.submenu ? (
				<div className="min-w-[18px]">
					<button
						type="button"
						className={`${dropdownMenuHeaderLink} ${
							pathname.includes(item.path) ? activeLink : ""
						}`}
						onClick={toggleSubMenu}
					>
						<div>{item.icon}</div>
						{!toggleCollapse && (
							<div className="flex flex-1 items-center justify-between">
								<span className="ml-3 cursor-pointer text-base font-semibold leading-6">
									{item.title}
								</span>
								<div>
									<BsChevronRight
										className={`${
											subMenuOpen ? "rotate-90" : ""
										} ml-auto cursor-pointer stroke-2 text-xs`}
									/>
								</div>
							</div>
						)}
					</button>
					{subMenuOpen && !toggleCollapse && (
						<div className="border-l-4 bg-royal/20">
							<div className="grid gap-y-3 px-8 py-0 leading-3">
								{item.subMenuItems?.map((subItem) => (
									<Link
										key={subItem.path}
										to={subItem.path}
										className={`${navMenuDropdownItem} ${
											subItem.path === pathname
												? "text-caution font-medium"
												: ""
										}`}
										onClick={closeSidebarOnMobile}
									>
										<span className="text-base font-normal">
											{subItem.title}
										</span>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<Link
					to={item.path}
					className={`${inactiveLink} ${
						pathname.startsWith(item.path) ? activeLink : ""
					} hover:bg-royal-light`}
					onClick={closeSidebarOnMobile}
				>
					<div
						className={cn(
							"min-w-[20px] text-2xl font-extrabold text-gray-500 dark:text-gray-100",
							{ "text-royal": item.path === pathname }
						)}
					>
						{item.icon}
					</div>
					{!toggleCollapse && (
						<span className="ml-3 leading-6">{item.title}</span>
					)}
				</Link>
			)}
		</div>
	);
}
