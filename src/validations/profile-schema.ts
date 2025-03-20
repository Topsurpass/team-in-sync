import { z } from "zod";

export const profileSchema = z.object({
	role: z.string().min(1, { message: "Role is required" }),
	profile_pic: z.string().min(1, { message: "Upload profile picture" }),
	experience_level: z.string().min(1, { message: "Experience level is required" }),
	portfolio_link: z.string().url({ message: "Invalid portfolio link" }),
	skills: z
		.array(
			z.object({
				label: z.string().min(1, { message: "Skill label is required" }),
				value: z.string().min(1, { message: "Skill value is required" }),
			})
		)
		.min(1, { message: "At least one skill is required" }),
});

export type ProfileInputs = z.infer<typeof profileSchema>;
