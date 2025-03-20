import { z } from "zod";
import { emailSchema } from "./schema";

export const SignupSchema = z

	.object({
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" }),
		fullName: z.string().min(1, { message: "Full name is required" }),
	})
	.extend({
		email: emailSchema,
	});

export type SignupInputs = z.infer<typeof SignupSchema>;
