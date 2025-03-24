import { LuClipboardList } from "react-icons/lu";
import { CiUser, CiHome, CiBellOn } from "react-icons/ci";

import { SideNavItem } from "@/types/sidenav-item";

const SIDENAV_ITEMS: SideNavItem[] = [
	{
		title: "",
		menuList: [
			{
				title: "Dashboard",
				path: "/dashboard",
				icon: <CiHome size={20} />,
			},
			{
				title: "Profile",
				path: "/profile",
				icon: <CiUser />,
			},
			{
				title: "My Projects",
				path: "/projects",
				icon: <LuClipboardList />,
			},
			{
				title: "Notification",
				path: "/notifications",
				icon: <CiBellOn />,
			},
		],
	},
];

export default SIDENAV_ITEMS;
