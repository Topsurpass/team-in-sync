import { MdOutlineHome } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LuBell } from "react-icons/lu";
import { FaProjectDiagram } from "react-icons/fa";

import { SideNavItem } from "@/types/sidenav-item";

const SIDENAV_ITEMS: SideNavItem[] = [
	{
		title: "",
		menuList: [
			{
				title: "Dashboard",
				path: "/dashboard",
				icon: <MdOutlineHome size={26} />,
			},

			{
				title: "My Projects",
				path: "/projects",
				icon: <FaProjectDiagram size={24} />,
			},

			{
				title: "Profile",
				path: "/profile",
				icon: <FaRegUser size={22} />,
			},
			{
				title: "Notification",
				path: "/notifications",
				icon: <LuBell />,
			},
		],
	},
];

export default SIDENAV_ITEMS;
