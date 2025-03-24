import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800">
			<div className="w-full max-w-md space-y-6 text-center">
				<div className="space-y-3">
					<h1 className="text-5xl font-bold text-red-500">404</h1>
					<p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
						Page Not Found
					</p>
					<p className="text-gray-500 dark:text-gray-400">
						The requested resource could not be located. Please verify the URL
						or navigate back to our platform.
					</p>
				</div>

				<div className="flex flex-col justify-center gap-4 sm:flex-row">
					<Button
						onClick={() => navigate(-1)}
						className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-3 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
					>
						<BiArrowBack className="text-xl" />
						<span>Return Back</span>
					</Button>

					<Button
						onClick={() => navigate("/")}
						className="transform rounded-lg border border-gray-300 px-6 py-3 transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
					>
						Go to Homepage
					</Button>
				</div>

				<p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
					Need assistance? Contact our{" "}
					<a
						href="/support"
						className="text-rose-600 hover:underline dark:text-rose-400"
					>
						support team
					</a>
				</p>
			</div>
		</div>
	);
}
