import { Outlet } from "react-router-dom";

export default function NoMenuBarProtectedLayout() {
	return (
		<div>
			<Outlet />
		</div>
	);
}
