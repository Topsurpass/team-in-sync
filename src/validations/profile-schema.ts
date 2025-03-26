import { z } from "zod";

export const profileSchema = z.object({
	role: z.string().min(1, { message: "Role is required" }),
	bio: z.string().optional(),
	full_name: z.string().min(1, { message: "Full name is required" }),
	profile_picture: z
		.instanceof(File, { message: "Please upload a valid image file." })
		.refine((file) => file.size > 0, { message: "File cannot be empty." }),

	experience_level: z.string().min(1, { message: "Experience level is required" }),
	portfolio_link: z.string().url({ message: "Invalid portfolio link" }),
	github_link: z
		.string()
		.optional()
		.refine((val) => !val || /^https?:\/\/github\.com\/.+/i.test(val), {
			message: "Invalid GitHub link",
		}),

	linkedin_link: z
		.string()
		.optional()
		.refine((val) => !val || /^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(val), {
			message: "Invalid LinkedIn link",
		}),
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
