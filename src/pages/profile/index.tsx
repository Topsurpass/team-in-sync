import { NavLink, Outlet } from "react-router-dom";

const tabs = [
	{ path: "", label: "Overview" },
	{ path: "skills", label: "Skills and Links" },
	{ path: "projects", label: "Projects" },
];

export default function ProfileLayout() {
	return (
		<div className="mx-auto w-full">
			<div className="m-2 flex gap-4 pb-0">
				{tabs.map((tab) => (
					<NavLink
						key={tab.path}
						to={tab.path}
						end
						className={({ isActive }) =>
							`pb-2 text-sm font-medium ${
								isActive
									? "border-b-2 border-primary font-bold text-primary"
									: "text-gray-500 hover:text-primary"
							}`
						}
					>
						{tab.label}
					</NavLink>
				))}
			</div>
			<Outlet />
		</div>
	);
}
