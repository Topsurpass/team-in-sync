import { RiToolsFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { NotificationsData } from "@/data/notification-data";
import EmptyAlert from "@/assets/empty-alert-pic.svg";

export default function SystemAlerts() {
	const hasNotifications = NotificationsData.length > 0;

	return (
		<div>
			{hasNotifications ? (
				NotificationsData.filter((notif) =>
					["platform_update", "reminder"].includes(notif.type)
				).map((notif) => (
					<Card className="mt-4 w-full">
						<CardHeader className="p-0 px-5 py-3">
							<CardDescription className="flex items-center justify-between">
								<div className="flex items-center">
									<RiToolsFill className="" size={22} />
									<span className="ml-2 text-royal">{notif.time}</span>
								</div>
								<MdDelete
									size={23}
									className="cursor-pointer text-red-500"
								/>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<h2 className="">{notif.title}</h2>
							<CardDescription>{notif.description}</CardDescription>
						</CardContent>
					</Card>
				))
			) : (
				<div className="flex h-[400px] w-full flex-col items-center justify-center text-center">
					<img src={EmptyAlert} alt="No Notifications" width={180} />
					<p className="mt-4 text-sm text-muted-foreground">
						You're all caught up! No notifications at the moment.
					</p>
				</div>
			)}
		</div>
	);
}
