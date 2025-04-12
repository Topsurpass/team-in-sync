import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
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
		<div className="min-h-screen w-full space-y-5 border bg-gray-100 p-5 md:px-16 md:pt-8">
			<div className="flex justify-between rounded-2xl bg-gray-200 p-5 font-bold">
				<p>Create New Project</p>
				<p
					className="cursor-pointer rounded-full border-2 border-gray-600 px-2"
					onClick={() => navigate(-1)}
				>
					X
				</p>
			</div>
			<div className="flex min-h-[500px] flex-col gap-5 rounded-2xl bg-white py-5 md:flex-row md:justify-between">
				<div className="space-y-5 px-5 md:w-1/2 md:border-r-2">
					<h2 className="font-bold">Project Details</h2>
					<TextField
						label="Title"
						name="title"
						control={control}
						placeholder="Give your project a title"
					/>
					<TextArea
						label="Description"
						name="description"
						control={control}
						placeholder="Give detailed description of this project"
						rows={10}
					/>

					<div className="hidden w-full justify-center pt-24 md:flex">
						<Button
							title="Submit"
							label="Submit"
							className="w-1/2 rounded-3xl py-6"
							onClick={handleSubmit}
							isLoading={isLoading}
						/>
					</div>
				</div>
				<div className="space-y-5 px-5 md:w-1/2">
					<div className="rounded-2xl border bg-gray-200 p-3 font-bold">
						Roles
					</div>
					<div className="flex w-full items-end gap-5">
						<div className="w-full">
							<TextField
								label="Required Roles"
								name="role"
								control={control}
								placeholder="Type new role and press enter"
								value={roleInput}
								onChange={(e) => setRoleInput(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</div>
					</div>

					<div className="space-y-2">
						{roles.map((role, index) => {
							const skillError = (errors.roles as any)?.[index]?.skills
								?.message;

							return (
								<div
									key={index}
									className="space-y-1 rounded-xl border bg-gray-200/50 p-2"
								>
									<div className="flex justify-between">
										<p className="text-sm font-semibold">
											{role.role}
										</p>
										<span className="flex gap-3">
											<p
												className="cursor-pointer text-royal"
												onClick={() => {
													setActiveRoleIndex(index);
													onModalOpen(EntityType.PROJECT);
												}}
											>
												Add skill
											</p>
											<p
												className="cursor-pointer text-destructive"
												onClick={() => handleRemoveRole(index)}
											>
												X
											</p>
										</span>
									</div>
									<div className="text-xs text-gray-600">
										<p>
											Skills:{" "}
											{role.skills.length > 0
												? role.skills
														.map((skill) => skill.label)
														.join(", ")
												: "No skills added yet"}
										</p>
									</div>
									{skillError && (
										<p className="text-xs font-medium text-destructive">
											{skillError}
										</p>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex w-full justify-center pt-4 md:hidden md:pt-8">
					<Button
						title="Submit"
						label="Submit"
						className="w-full rounded-3xl py-6 md:w-1/2"
						onClick={handleSubmit}
						isLoading={isLoading}
					/>
				</div>
			</div>
			<SkillsModal />
		</div>
	);
}
