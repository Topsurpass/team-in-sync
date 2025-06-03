import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { X, PlusCircle, Trash2, AlertCircle } from "lucide-react";
import { TextField, TextArea } from "@/components/ui/forms";
import { Button } from "@/components/ui/button";
import useGlobalProvider from "@/hooks/use-global-provider";
import { EntityType } from "@/types/enum";
import SkillsModal from "./skills-modal";

type handleSubmitProps = {
	handleSubmit: () => void;
	isLoading?: boolean;
};

export default function CreateNewProject({ handleSubmit, isLoading }: handleSubmitProps) {
	const { onModalOpen } = useGlobalProvider();
	const { control, watch, setValue, trigger, formState } = useFormContext();
	const navigate = useNavigate();
	const roles = watch("roles", []) as { role: string; skills: { label: string }[] }[];
	const [, setActiveRoleIndex] = useState<number | null>(null);
	const [roleInput, setRoleInput] = useState("");
	const { errors } = formState;
	const handleAddRole = useCallback(() => {
		if (roleInput.trim()) {
			const updatedRoles = [
				...roles,
				{ role: roleInput.trim(), skills: [], number_required: "1" },
			];
			setValue("roles", updatedRoles);
			trigger("roles");
			setRoleInput("");
		}
	}, [roleInput, roles, setValue, trigger]);

	const handleRemoveRole = useCallback(
		(indexToRemove: number) => {
			const updatedRoles = roles.filter((_, i) => i !== indexToRemove);
			setValue("roles", updatedRoles);
			trigger("roles");
			trigger(`roles.${indexToRemove}.number_required`);
		},
		[roles, setValue, trigger]
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddRole();
		}
	};

	return (
		<div className="from-gray-25 min-h-screen w-full bg-gradient-to-br to-gray-100 p-2 md:p-8">
			<div className="flex items-center justify-between rounded-2xl border bg-white px-3 py-5 shadow-md md:px-8">
				<div>
					<h1 className="text-xl font-bold text-gray-900 md:text-xl">
						Create New Project
					</h1>
					<p className="mt-1 text-sm text-gray-500">
						Start collaborating with your team in minutes
					</p>
				</div>
				<button
					className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600"
					onClick={() => navigate(-1)}
				>
					<X className="h-6 w-6" />
				</button>
			</div>

			<div className="mt-8 grid gap-8 rounded-2xl border bg-white p-3 shadow-md md:grid-cols-2 md:p-8">
				<div className="space-y-6 md:pr-8">
					<div className="border-b border-gray-100 pb-4">
						<h2 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
							Project Details
						</h2>
					</div>

					<TextField
						label="Project Title"
						name="title"
						control={control}
						placeholder="Enter project name"
						className=""
					/>

					<TextArea
						label="Description"
						name="description"
						control={control}
						placeholder="Describe the project goals and scope"
						rows={6}
						className=""
					/>

					<div className="hidden border-t border-gray-100 pt-6 md:block">
						<Button
							label="Create Project"
							className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02] hover:from-blue-700 hover:to-blue-600"
							onClick={handleSubmit}
							isLoading={isLoading}
						/>
					</div>
				</div>

				<div className="md:pl-8">
					<div className="mb-6 rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 px-6 py-4">
						<h3 className="text-sm font-semibold uppercase tracking-wide text-white">
							Team Requirements
						</h3>
					</div>

					<TextField
						label="Add Role"
						name="role"
						control={control}
						placeholder="Enter role (e.g. Frontend Developer)"
						value={roleInput}
						onChange={(e) => setRoleInput(e.target.value)}
						onKeyDown={handleKeyDown}
						className=""
					/>

					<div className="mt-6 space-y-4">
						{roles.map((role, index) => {
							const skillError = (errors.roles as any)?.[index]?.skills
								?.message;

							return (
								<div
									key={index}
									className="group relative rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-blue-100 hover:shadow-md"
								>
									<div className="flex items-start justify-between">
										<div>
											<p className="font-medium text-gray-900">
												{role.role}
											</p>
											<div className="mt-2 flex flex-wrap gap-2">
												{role.skills.length > 0 ? (
													role.skills.map((skill) => (
														<span
															key={skill.label}
															className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
														>
															{skill.label}
														</span>
													))
												) : (
													<span className="text-sm text-gray-400">
														No skills added
													</span>
												)}
											</div>
										</div>
										<div className="flex items-center gap-3">
											<button
												className="text-blue-600 transition-colors hover:text-blue-700"
												onClick={() => {
													setActiveRoleIndex(index);
													onModalOpen(EntityType.PROJECT);
												}}
											>
												<PlusCircle className="h-5 w-5" />
											</button>
											<button
												className="text-gray-400 transition-colors hover:text-red-500"
												onClick={() => handleRemoveRole(index)}
											>
												<Trash2 className="h-5 w-5" />
											</button>
										</div>
									</div>

									{skillError && (
										<div className="mt-3 flex items-center gap-2 text-sm text-red-600">
											<AlertCircle className="h-4 w-4" />
											<span>{skillError}</span>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className="border-t border-gray-100 pt-6 md:hidden">
					<Button
						label="Create Project"
						className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white hover:from-blue-700 hover:to-blue-600"
						onClick={handleSubmit}
						isLoading={isLoading}
					/>
				</div>
			</div>

			<SkillsModal />
		</div>
	);
}
