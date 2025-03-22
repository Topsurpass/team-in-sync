import { JSX } from "react";

export type MenuList = {
	title: string;
	path: string;
	icon?: JSX.Element;
	submenu?: boolean | undefined;
	permission?: any;
	subMenuItems?: {
		title: string;
		path: string;
	}[];
};

export type SideNavItem = {
	title: string;
	menuList: MenuList[];
};
export type SideNavItems = {
	title: string;
	menuList: MenuList[];
}[];
