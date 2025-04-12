import { User } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SkeletonJob({ size }: { size: number }) {
	const skeletonArray = Array.from({ length: size });

	return (
		<section className="grid w-[100%] gap-8 p-5 md:grid-cols-2 md:p-0 lg:w-[80%] 2xl:grid-cols-3">
			{skeletonArray.map((_, idx) => (
				<Card
					className="mx-auto flex w-[100%] animate-pulse flex-col shadow-lg"
					key={idx}
				>
					<CardHeader className="border-b pb-4">
						<div className="flex flex-row items-center justify-between">
							<CardTitle className="mb-2 h-6 w-3/4 rounded bg-gray-300"></CardTitle>
							<div className="h-6 w-6 rounded-full bg-gray-300"></div>
						</div>
						<div>
							<CardDescription className="mb-2 h-4 w-1/2 rounded bg-gray-300"></CardDescription>
							<CardDescription className="h-4 w-3/4 rounded bg-gray-300">
								<p className="h-3 w-full rounded bg-gray-300"></p>
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="flex-grow space-y-4 pt-3">
						<div className="h-20 rounded bg-gray-300"></div>
					</CardContent>
					<CardFooter className="flex items-center justify-between border-t pt-4">
						<div className="h-4 w-1/4 rounded bg-gray-300"></div>
						<div className="ml-auto h-8 w-24 rounded bg-gray-300"></div>
					</CardFooter>
				</Card>
			))}
		</section>
	);
}

export function SkeletonListJob({ size }: { size: number }) {
	const skeletonArray = Array.from({ length: size });
	return (
		<section className="flex w-[100%] flex-col gap-5">
			{skeletonArray.map((_, idx) => (
				<Card
					className="mx-auto flex w-[100%] animate-pulse flex-col shadow-lg lg:w-[50%] 2xl:w-[500px]"
					key={idx}
				>
					<CardHeader className="border-b pb-4">
						<div className="flex flex-row items-center justify-between">
							<CardTitle className="mb-2 h-6 w-3/4 rounded bg-gray-300"></CardTitle>
							<div className="h-6 w-6 rounded-full bg-gray-300"></div>
						</div>
						<div>
							<CardDescription className="mb-2 h-4 w-1/2 rounded bg-gray-300"></CardDescription>
							<CardDescription className="h-4 w-3/4 rounded bg-gray-300">
								<p className="h-3 w-full rounded bg-gray-300"></p>
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="flex-grow space-y-4 pt-3">
						<div className="h-20 rounded bg-gray-300"></div>
					</CardContent>
					<CardFooter className="flex items-center justify-between border-t pt-4">
						<div className="h-4 w-1/4 rounded bg-gray-300"></div>
						<div className="ml-auto h-8 w-24 rounded bg-gray-300"></div>
					</CardFooter>
				</Card>
			))}
		</section>
	);
}

export function SkeletonJobDecription({ size }: { size: number }) {
	const skeletonArray = Array.from({ length: size });

	return (
		<section className="sticky top-28 hidden h-[80vh] overflow-y-auto md:block md:w-1/3">
			{skeletonArray.map((_, idx) => (
				<Card
					className="mx-auto flex w-[100%] animate-pulse flex-col shadow-lg"
					key={idx}
				>
					<CardHeader className="border-b pb-4">
						<div className="flex flex-row items-center justify-between">
							<CardTitle className="mb-2 h-6 w-3/4 rounded bg-gray-300"></CardTitle>
							<div className="h-6 w-6 rounded-full bg-gray-300"></div>
						</div>
						<div>
							<CardDescription className="mb-2 h-4 w-1/2 rounded bg-gray-300"></CardDescription>
							<CardDescription className="h-4 w-3/4 rounded bg-gray-300">
								<p className="h-3 w-full rounded bg-gray-300"></p>
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="flex-grow space-y-4 pt-3">
						<div className="h-40 rounded bg-gray-300"></div>
						<div className="h-40 rounded bg-gray-300"></div>
						<div className="h-20 rounded bg-gray-300"></div>
					</CardContent>
					<CardFooter className="flex items-center justify-between border-t pt-4">
						<div className="h-4 w-1/4 rounded bg-gray-300"></div>
						<div className="ml-auto h-8 w-24 rounded bg-gray-300"></div>
					</CardFooter>
				</Card>
			))}
		</section>
	);
}

export function SkeletonJobDetails({ size }: { size: number }) {
	const skeletonArray = Array.from({ length: size });
	return (
		<section className="flex flex-col items-center justify-center px-5">
			{skeletonArray.map((_, idx) => (
				<Card
					className="my-24 flex w-full max-w-4xl animate-pulse flex-col shadow-lg"
					key={idx}
				>
					<CardHeader className="border-b pb-4">
						<div className="flex flex-row items-center justify-between">
							<CardTitle className="mb-2 h-6 w-3/4 rounded bg-gray-300"></CardTitle>
							<div className="h-8 w-8 rounded-md bg-gray-300 md:h-10 md:w-28"></div>
						</div>
						<div>
							<CardDescription className="mb-2 h-4 w-1/2 rounded bg-gray-300"></CardDescription>
							<CardDescription className="h-4 w-3/4 rounded bg-gray-300">
								<p className="h-3 w-full rounded bg-gray-300"></p>
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="flex-grow space-y-4 pt-3">
						<div className="h-40 rounded bg-gray-300"></div>
						<div className="h-40 rounded bg-gray-300"></div>
						<div className="h-20 rounded bg-gray-300"></div>
						<div className="h-40 rounded bg-gray-300"></div>
						<div className="h-20 rounded bg-gray-300"></div>
					</CardContent>
					<CardFooter className="flex items-center justify-between border-t pt-4">
						<div className="h-4 w-1/4 rounded bg-gray-300"></div>
						<div className="ml-auto h-8 w-24 rounded bg-gray-300"></div>
					</CardFooter>
				</Card>
			))}
		</section>
	);
}

export default function ApplicantProfileSkeleton() {
	return (
		<div className="mx-auto w-full animate-pulse rounded-lg border border-gray-300 bg-white p-8 shadow-lg">
			{/* Header Skeleton */}
			<div className="mb-8 flex w-full justify-between border-b pb-6">
				<div className="flex items-center space-x-4 border-gray-300">
					<div className="flex h-16 w-16 items-center justify-center rounded-full border bg-gray-200">
						<User className="text-gray-300" />
					</div>
					<div>
						<div className="mb-2 h-6 w-32 rounded-md bg-gray-200"></div>
						<div className="h-4 w-24 rounded-md bg-gray-200"></div>
					</div>
				</div>
				<div>
					<div className="h-10 w-10 rounded-full bg-gray-200"></div>
				</div>
			</div>

			{/* Contact Information Skeleton */}
			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
				{Array(3)
					.fill(0)
					.map((_, index) => (
						<div key={index} className="flex items-center space-x-2">
							<div className="h-5 w-5 rounded-full bg-gray-200"></div>
							<div className="h-4 w-40 rounded-md bg-gray-200"></div>
						</div>
					))}
				<div className="flex items-center space-x-2">
					<div className="h-5 w-5 rounded-full bg-gray-200"></div>
					<div className="h-4 w-32 rounded-md bg-gray-200"></div>
				</div>
			</div>

			{/* Applicant Proposal Skeleton */}
			<div className="mb-8">
				<div className="mb-2 h-5 w-40 rounded-md bg-gray-200"></div>
				<div className="h-4 w-full rounded-md bg-gray-200"></div>
				<div className="mt-2 h-4 w-3/4 rounded-md bg-gray-200"></div>
			</div>

			{/* Additional Details Skeleton */}
			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
				{["Experience", "Education", "Skills", "Certifications", "Portfolio"].map(
					(_, index) => (
						<div key={index}>
							<div className="mb-2 flex items-center">
								<div className="mr-2 h-6 w-6 rounded-full bg-gray-200"></div>
								<div className="h-5 w-32 rounded-md bg-gray-200"></div>
							</div>
							<ul className="space-y-2">
								{Array(3)
									.fill(0)
									.map((_, itemIndex) => (
										<li
											key={itemIndex}
											className="h-4 w-full rounded-md bg-gray-200"
										></li>
									))}
							</ul>
						</div>
					)
				)}
			</div>

			{/* Action Buttons Skeleton */}
			<div className="justify-left mt-8 flex flex-wrap gap-5 md:justify-end">
				{Array(3)
					.fill(0)
					.map((_, index) => (
						<div
							key={index}
							className="h-10 w-32 rounded-md bg-gray-200"
						></div>
					))}
			</div>
		</div>
	);
}

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
	);
}

export { Skeleton };
