import { Mail, AlertCircle } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginPic from "@/assets/login-pic.svg";
import { Button } from "@/components/ui/button";
import Rectangle from "@/assets/rectangle.svg";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PasswordField, TextField } from "@/components/ui/forms";
import { LoginInputs, LoginSchema } from "@/validations/login-schema";
import useLoginUser from "@/api/authentication/use-login-user";
import { useGoogleAuth } from "@/providers/google-auth";

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { handleSuccess, handleFailure } = useGoogleAuth();
	const navigate = useNavigate();
	const { control, handleSubmit } = useForm<LoginInputs>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate: loginUser, isPending, isError, error } = useLoginUser();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const processForm: SubmitHandler<LoginInputs> = async (data) => {
		loginUser(data);
	};

	return (
		<div className="relative flex h-screen w-full flex-col">
			<form className="mx-auto flex w-full flex-col md:flex-row md:gap-5 md:px-4">
				<div className="hidden md:flex md:h-screen md:w-1/2 md:p-5">
					<div
						className="flex h-full w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat md:justify-evenly md:bg-contain"
						style={{ backgroundImage: `url("${Rectangle}")` }}
					>
						<div className="max-w-sm text-center">
							<h1 className="text-2xl font-bold dark:text-black">
								Jump back into your projects and connect with your team.
							</h1>
						</div>
						<img
							className="md:h-[50%] md:w-[50%]"
							src={LoginPic}
							alt="Login photo"
						/>
					</div>
				</div>

				<Card className="border-0 shadow-none lg:w-1/3">
					<CardHeader className="mb-5 mt-12">
						<CardTitle className="text-2xl">Login</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div>
							<TextField
								label="Email"
								name="email"
								control={control}
								icon={<Mail size={18} />}
								iconPosition="left"
								placeholder="Enter your email address"
							/>
						</div>
						<div>
							<PasswordField
								label="Password"
								name="password"
								control={control}
								showPassword={showPassword}
								placeholder="Enter your password"
								onIconClick={() => handleShowPassword()}
								type={showPassword ? "text" : "password"}
								showLeftIcon
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center space-x-2">
								<input type="checkbox" />
								<span>Remember me</span>
							</div>
							<Button
								type="button"
								onClick={() => navigate("/forgot-password")}
								variant="link"
								className="text-gray-700 dark:text-white"
							>
								Forget Password?
							</Button>
						</div>
						<Button
							className="w-2/3 rounded-3xl"
							type="submit"
							label="Login"
							onClick={handleSubmit(processForm)}
							isLoading={isPending}
							disabled={isPending}
						/>
						<div>
							<p>
								Dont't have an account?{" "}
								<Link
									to="/register"
									className="text-royal hover:underline"
								>
									Create an Account
								</Link>
							</p>
						</div>
						{isError && (
							<div className="mt-2 flex items-center justify-center gap-2">
								<AlertCircle size={20} color="red" />
								<span className="text-red-500">
									{error?.response?.data?.message as any}
								</span>
							</div>
						)}
						<div className="relative my-6 w-1/3">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-muted-foreground"></div>
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									OR
								</span>
							</div>
						</div>
						{/* Google Sign-Up Button */}
						<div className="mt-4 flex items-center justify-center">
							<GoogleLogin
								onSuccess={handleSuccess}
								onError={handleFailure}
								text="continue_with"
								shape="pill"
							/>
						</div>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
