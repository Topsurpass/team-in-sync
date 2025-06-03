import { Notification } from "@/types";

export const NotificationsData: Notification[] = [
	{
		id: 1,
		type: "project_added",
		title: "You have been added to a new project",
		description: "James accepted your request to join Mobile app onboarding project",
		time: "2 days ago",
	},
	{
		id: 2,
		type: "join_request",
		title: "Request to join your project",
		description: "Sarah sent a request to join UI/UX Redesign project",
		time: "Yesterday",
	},
	{
		id: 3,
		type: "platform_update",
		title: "Platform Update",
		description:
			"We've added GitHub integration! You can now link repositories to your projects.",
		time: "2 weeks ago",
	},
	{
		id: 4,
		type: "project_added",
		title: "You've been added to Dashboard Redesign",
		description: "Admin added you to the Dashboard Redesign project",
		time: "3 days ago",
	},
	{
		id: 5,
		type: "join_request",
		title: "Request to join your project",
		description: "Mike wants to collaborate on the AI Image Tool project",
		time: "Just now",
	},
	{
		id: 6,
		type: "reminder",
		title: "Weekly Stand-up Reminder",
		description: "Don't forget to fill out your stand-up update before tomorrow",
		time: "Today",
	},
	{
		id: 7,
		type: "project_added",
		title: "You have been assigned to a new task",
		description: "You’re now responsible for setting up API endpoints in Travel App",
		time: "4 hours ago",
	},
	{
		id: 8,
		type: "platform_update",
		title: "New Feature: Dark Mode",
		description: "You can now switch to Dark Mode from your settings page!",
		time: "5 days ago",
	},
	{
		id: 9,
		type: "join_request",
		title: "Request to join your project",
		description: "Ada sent a request to join your Mental Health App project",
		time: "1 hour ago",
	},
	{
		id: 10,
		type: "project_added",
		title: "Added to a beta test project",
		description: "You're now part of the Beta Testing team for AI Voice Bot",
		time: "6 days ago",
	},
];
