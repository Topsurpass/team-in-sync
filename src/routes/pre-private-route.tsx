import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/user-store";

function PreProtectedRoute({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	// const isProfileComplete = useAuthStore((state) => state.is_profile_complete);

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
}

export default PreProtectedRoute;
