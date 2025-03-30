import GoogleAuth from "@/providers/google-auth";
import LoginForm from "./login-form";

export default function Login() {
	return (
		<GoogleAuth authType="sign-in">
			<LoginForm />
		</GoogleAuth>
	);
}
