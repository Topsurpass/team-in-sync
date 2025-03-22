import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Pagewrapper from "@/components/pagewrapper";
import SideBar from "@/components/sidebar/sidebar";

export default function RootLayout() {
	return (
		<div>
			<SideBar />
			<div className="flex h-full w-full flex-col">
				<Header />
				<Pagewrapper>
					<Outlet />
				</Pagewrapper>
			</div>
		</div>
	);
}
