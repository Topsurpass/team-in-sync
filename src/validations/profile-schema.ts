import { z } from "zod";

export const profileSchema = z.object({
	role: z.object({
		value: z.number().min(1, { message: "Role is required" }),
		label: z.string().min(1, { message: "Label is required" }),
	}),
	bio: z
		.string()
		.trim()
		.min(1, { message: "Bio is required." })
		.refine((val) => val.split(/\s+/).filter(Boolean).length >= 20, {
			message: "Bio must be at least 20 words long.",
		}),
	full_name: z.string().min(1, { message: "Full name is required" }),
	profile_picture: z.union([
		z
			.instanceof(File, { message: "Please upload a valid image file." })
			.refine((file) => file.size > 0, { message: "File cannot be empty." }),
		z.string().url({ message: "Please provide a valid image URL." }),
	]),

	experience_level: z.object({
		value: z.string().min(1, { message: "Experience level is required" }),
		label: z.string().min(1, { message: "Label is required" }),
	}),
	portfolio_link: z
		.string()
		.trim()
		.optional()
		.refine((val) => !val || /^https:\/\/.+\..+/.test(val), {
			message: "Portfolio link must be a valid HTTPS URL",
		}),
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
				value: z.union([
					z.number().min(1, { message: "Skill value is required" }),
					z.string().min(1, { message: "Skill value is required" }),
				]),
			})
		)
		.min(1, { message: "At least one skill is required" }),
});

export const userSkillsAndLinksSchema = z.object({
	portfolio_link: z
		.string()
		.trim()
		.optional()
		.refine((val) => !val || /^https:\/\/.+\..+/.test(val), {
			message: "Portfolio link must be a valid HTTPS URL",
		}),
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
				value: z.union([
					z.number().min(1, { message: "Skill value is required" }),
					z.string().min(1, { message: "Skill value is required" }),
				]),
			})
		)
		.min(1, { message: "At least one skill is required" }),
});

export const userDetailsSchema = z.object({
	role: z.object({
		value: z.number().min(1, { message: "Role is required" }),
		label: z.string().min(1, { message: "Label is required" }),
	}),
	bio: z
		.string()
		.trim()
		.min(1, { message: "Bio is required." })
		.refine((val) => val.split(/\s+/).filter(Boolean).length >= 20, {
			message: "Bio must be at least 20 words long.",
		}),
	full_name: z.string().min(1, { message: "Full name is required" }),
	profile_picture: z.union([
		z
			.instanceof(File, { message: "Please upload a valid image file." })
			.refine((file) => file.size > 0, { message: "File cannot be empty." }),
		z.string().url({ message: "Please provide a valid image URL." }),
	]),

	experience_level: z.object({
		value: z.string().min(1, { message: "Experience level is required" }),
		label: z.string().min(1, { message: "Label is required" }),
	}),
});

export type UserDetailsInputs = z.infer<typeof userDetailsSchema>;
export type UserSkillsLinksInput = z.infer<typeof userSkillsAndLinksSchema>;
export type ProfileInputs = z.infer<typeof profileSchema>;
