import { ReactNode } from "react";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { cn } from "@/lib/utils";

export default function PageWrapper({ children }: { children: ReactNode }) {
	const { toggleCollapse } = useSideBarToggle();
	const bodyStyle = cn(
		"mt-[68px] ml-1 h-full overflow-y-auto mb-5 transition-all duration-300 ease-in-out",
		{
			"sm:pl-[18rem]": !toggleCollapse,
			"sm:pl-[5.4rem]": toggleCollapse,
			"md:pl-[18rem] md:pr-0": !toggleCollapse,
			"md:pl-[5.5rem] md:pr-2": toggleCollapse,
		}
	);

	return <div className={bodyStyle}>{children}</div>;
}
