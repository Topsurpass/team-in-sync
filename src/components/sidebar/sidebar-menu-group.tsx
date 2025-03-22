import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { MenuList, SideNavItem } from "@/types/sidenav-item";
import SideBarMenuItem from "@/components/sidebar/sidebar-menu-item";
import { cn } from "@/lib/utils";

function SideBarMenuGroup({ menuGroup }: { menuGroup: SideNavItem }) {
	const { toggleCollapse } = useSideBarToggle();

	const fileredMenuList = menuGroup.menuList.filter((item) => {
		return item;
	});

	const menuGroupTitleSyle = cn("py-4 tracking-[.1rem] font-bold uppercase text-sm", {
		"text-center": toggleCollapse,
	});
	return (
		<div className="flex flex-col gap-4">
			{menuGroup.title && (
				<h3 className={menuGroupTitleSyle}>
					{!toggleCollapse ? menuGroup.title : "..."}
				</h3>
			)}
			{fileredMenuList?.map((item: MenuList) => {
				return <SideBarMenuItem key={item.title} item={item} />;
			})}
		</div>
	);
}

export default SideBarMenuGroup;
