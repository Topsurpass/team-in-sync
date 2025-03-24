import Home from "@/pages/home-page";
import Login from "@/pages/login";
import SignUp from "@/pages/sign-up";
import CompleteProfile from "@/pages/complete-profile";
import Dashboard from "@/pages/dashboard";
import RootLayout from "@/layout/root-layout";
import ProtectedRoute from "./protected-route";
import Profile from "@/pages/profile";
import Projects from "@/pages/projects";
import Notifications from "@/pages/notifications";
import PublicLayout from "@/layout/public-layout";
import PublicRoute from "./public-route";
import VerifyEmail from "@/pages/verify-email";
import NotFoundPage from "@/pages/error404";

const routeConfig = [
	{
		path: "/",
		element: (
			<PublicRoute>
				<PublicLayout />
			</PublicRoute>
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <SignUp />,
			},
			{
				path: "verify-email/:token",
				element: <VerifyEmail />,
			},
		],
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
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "create-profile",
				element: <CompleteProfile />,
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
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export default routeConfig;
