import GoogleAuth from "@/providers/google-auth";
import SignUpForm from "./signup-form";

export default function SignUp() {
	return (
		<GoogleAuth authType="sign-up">
			<SignUpForm />
		</GoogleAuth>
	);
}
