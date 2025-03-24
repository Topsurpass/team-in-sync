import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/user-store";

function PublicRoute({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return isAuthenticated ? (
		<Navigate to="/dashboard" state={{ from: location }} replace />
	) : (
		children
	);
}

export default PublicRoute;
