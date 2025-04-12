import { Navigate } from "react-router-dom";
import Home from "@/pages/home-page";
import Login from "@/pages/login";
import SignUp from "@/pages/sign-up";
import CompleteProfile from "@/pages/complete-profile";
import Dashboard from "@/pages/dashboard";
import RootLayout from "@/layout/root-layout";
import ProtectedRoute from "./protected-route";
import ProfileLayout from "@/pages/profile";
import Projects from "@/pages/projects";
import Notifications from "@/pages/notifications";
import PublicLayout from "@/layout/public-layout";
import PublicRoute from "./public-route";
import VerifyEmail from "@/pages/verify-email";
import NotFoundPage from "@/pages/error404";
import NoMenuBarProtectedLayout from "@/layout/no-menu-protected-layout";
import NewProject from "@/pages/projects/new/";
import Skills from "@/pages/profile/skills";
import Overview from "@/pages/profile/overview";
import ProfileProjects from "@/pages/profile/projects";
import ProfileProtectedRoute from "./profile-protected-route";

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
			<ProfileProtectedRoute>
				<RootLayout />
			</ProfileProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <Navigate to="dashboard" replace />,
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "profile",
				element: <ProfileLayout />,
				children: [
					{
						index: true,
						element: <Overview />,
					},
					{
						path: "skills",
						element: <Skills />,
					},
					{
						path: "projects",
						element: <ProfileProjects />,
					},
				],
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
		path: "/",
		element: (
			<ProtectedRoute>
				<NoMenuBarProtectedLayout />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				path: "create-profile",
				element: <CompleteProfile />,
			},
			{
				path: "project/new",
				element: <NewProject />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export default routeConfig;
