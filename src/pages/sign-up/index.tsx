import { Mail, AlertCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignupPic from "@/assets/signup-pic.svg";
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
import { SignupInputs, SignupSchema } from "@/validations/signup-schema";
import useSignupUser from "@/api/authentication/use-signup-user";

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { control, handleSubmit } = useForm<SignupInputs>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			first_name: "",
			last_name: "",
		},
	});

	const { mutate: signupUser, isPending, isError, error } = useSignupUser();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const processForm: SubmitHandler<SignupInputs> = async (data) => {
		// JSON.stringify(data, null, 2);
		signupUser(data);
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
								Join Our Community and Build Your Future.
							</h1>
						</div>
						<img
							className="md:h-[50%] md:w-[50%]"
							src={SignupPic}
							alt="Signup photo"
						/>
					</div>
				</div>

				<Card className="border-0 shadow-none lg:w-1/3">
					<CardHeader className="mb-5 mt-12">
						<CardTitle className="text-2xl">Create an account</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div>
							<TextField
								label="Firstname"
								name="first_name"
								control={control}
								placeholder="Type your full name"
							/>
						</div>
						<div>
							<TextField
								label="Lastname"
								name="last_name"
								control={control}
								placeholder="Type your full name"
							/>
						</div>
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
						<div>
							<PasswordField
								label="Confirm Password"
								name="confirmPassword"
								control={control}
								showPassword={showConfirmPassword}
								placeholder="Enter your password"
								onIconClick={() => handleShowConfirmPassword()}
								type={showConfirmPassword ? "text" : "password"}
								showLeftIcon={false}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button
							className="w-2/3 rounded-3xl"
							type="submit"
							label="Create account"
							onClick={handleSubmit(processForm)}
							isLoading={isPending}
							disabled={isPending}
						/>
						<div>
							<p>
								Already have an account?{" "}
								<Link to="/login" className="text-royal hover:underline">
									Log In
								</Link>
							</p>
						</div>
						{isError && (
							<div className="mt-2 flex items-center justify-center gap-2">
								<AlertCircle size={20} color="red" />
								<span className="text-red-500">
									{error?.response?.data?.errors?.email as any}
								</span>
							</div>
						)}
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
