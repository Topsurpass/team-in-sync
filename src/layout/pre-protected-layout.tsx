import { Outlet } from "react-router-dom";

export default function PreProtectedLayout() {
	return (
		<div>
			<Outlet />
		</div>
	);
}
