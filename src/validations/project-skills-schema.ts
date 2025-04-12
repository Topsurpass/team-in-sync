import { z } from "zod";

export const addProjectSchema = z.object({
	title: z.string().trim().min(1, { message: "Project title is required" }),
	status: z.string().trim().min(1, { message: "Status is required" }),

	description: z
		.string()
		.trim()
		.min(1, { message: "Full project description is required." })
		.refine((val) => val.split(/\s+/).filter(Boolean).length >= 20, {
			message: "Full description must be at least 20 words long.",
		}),
	roles: z
		.array(
			z.object({
				role: z.string().min(1, { message: "Role name is required" }),
				skills: z
					.array(
						z.object({
							label: z
								.string()
								.min(1, { message: "Skill label is required" }),
							value: z
								.number()
								.min(1, { message: "Skill value is required" }),
						})
					)
					.min(1, { message: "At least one skill is required" }),
				number_required: z
					.string()
					.transform((val) => Number(val))
					.refine((val) => !isNaN(val) && val >= 1, {
						message: "Minimum contributor is 1",
					}),
			})
		)
		.min(1, { message: "At least one role is required" }),
});

export type AddProjectInputs = z.infer<typeof addProjectSchema>;
