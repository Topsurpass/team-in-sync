import { z } from "zod";
import { emailSchema } from "./schema";
import { password as regexPassword } from "./regex";

export const SignupSchema = z
	.object({
		password: z
			.string()
			.min(1, { message: "Password is required" })
			.regex(
				regexPassword,
				"Password must be 8+ characters, with a letter, number, and special character"
			),
		confirmPassword: z
			.string()
			.min(1, { message: "Password is required" })
			.regex(
				regexPassword,
				"Password must be 8+ characters, with a letter, number, and special character"
			),
		// first_name: z.string().min(1, { message: "Firstname is required" }),
		// last_name: z.string().min(1, { message: "Lastname is required" }),
		email: emailSchema,
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["confirmPassword"],
				message: "Passwords do not match",
			});
		}
	});

export type SignupInputs = z.infer<typeof SignupSchema>;
