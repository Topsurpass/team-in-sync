import { create } from "zustand";

interface SidebarToggle {
	toggleCollapse: boolean;
	invokeToggleCollapse: () => void;
	closeSidebarOnMobile: () => void;
}

export const useSideBarToggle = create<SidebarToggle>((set, get) => ({
	toggleCollapse: true,

	invokeToggleCollapse: () => set({ toggleCollapse: !get().toggleCollapse }),

	closeSidebarOnMobile: () => {
		if (typeof window !== "undefined" && window.innerWidth < 768) {
			set({ toggleCollapse: true });
		}
	},
}));
