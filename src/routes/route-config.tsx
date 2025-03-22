import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/sign-up";
import CompleteProfile from "@/pages/complete-profile";
import Dashboard from "@/pages/dashboard";
import RootLayout from "@/layout/root-layout";
import ProtectedRoute from "./protected-route";
import Profile from "@/pages/profile";
import Projects from "@/pages/projects";
import Notifications from "@/pages/notifications";

const routeConfig = [
	{
		path: "/onboarding",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <SignUp />,
	},
	{
		path: "/create-profile",
		element: <CompleteProfile />,
	},
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<RootLayout />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "projects",
				element: <Projects />,
			},
			{
				path: "notifications",
				element: <Notifications />,
			},
		],
	},
];

export default routeConfig;
