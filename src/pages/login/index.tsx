import { Mail, AlertCircle } from "lucide-react";
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

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { control, handleSubmit } = useForm<LoginInputs>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "user@gmail.com",
			password: "password",
		},
	});

	const { mutate: loginUser, isPending, isError, error } = useLoginUser();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const processForm: SubmitHandler<LoginInputs> = async (data) => {
		// JSON.stringify(data, null, 2);
		loginUser(data);
	};

	return (
		<div className="relative flex h-screen w-full flex-col">
			<form className="mx-auto flex w-full flex-col gap-5 px-4 md:flex-row">
				<div className="p-5 md:h-screen md:w-1/2">
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
								showLeftIcon={false}
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
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
