import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "@/routes/route-config";

/** for tailwindcss debug screen */
if (import.meta.env.MODE === "development") {
	document.body.classList.add("debug-screens");
}

export default function RouteRenderer() {
	const router = createBrowserRouter(routesConfig);
	return <RouterProvider router={router} />;
}
