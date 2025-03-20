import CountdownTimer from "@/components/countdown-timer";
export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
			<main className="flex w-full max-w-4xl flex-col items-center space-y-12 text-center">
				<h1 className="animate-pulse text-3xl font-extrabold tracking-tight md:text-6xl">
					<span className="bg-gradient-to-l from-cyan-400 to-red-500 bg-clip-text text-transparent">
						Development starts soon
					</span>
				</h1>

				<CountdownTimer countdownDate="2025-03-23T00:00:00" />

				<div className="animate-pulse-slow space-y-4">
					<p className="text-xl">Crafting something extraordinary</p>
				</div>
			</main>
		</div>
	);
}
