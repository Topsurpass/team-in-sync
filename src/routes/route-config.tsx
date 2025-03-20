import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/sign-up";
import Profile from "@/pages/profile";

const routeConfig = [
	{
		path: "/",
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
		element: <Profile />,
	},
];

export default routeConfig;
