import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import LoginPic from "@/assets/login-pic.svg";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PasswordField, TextField } from "@/components/ui/forms";
import { LoginInputs, LoginSchema } from "@/validations/login-schema";
//import useLoginUser from "@/api/authentication/use-login-user";

const svgBackground = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 638 768">
     <path d="M0 24C0 10.7452 10.7452 0 24 0H613.776C627.868 0 638.928 12.0844 637.682 26.1214L573.788 746.121C572.689 758.505 562.315 768 549.882 768H24C10.7451 768 0 757.255 0 744V24Z" fill="#E9EFFD"/>
   </svg>`
)}`;

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { control, handleSubmit } = useForm<LoginInputs>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "admin@gmail.com",
			password: "password",
		},
	});

	//const { mutate: loginUser, isPending, isError, error } = useLoginUser();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const processForm: SubmitHandler<LoginInputs> = async (data) => {
		JSON.stringify(data, null, 2);
		//loginUser(data);
	};

	return (
		<div className="relative flex h-screen w-full flex-col">
			<form className="mx-auto flex w-full flex-col gap-5 px-4 md:flex-row">
				<div className="p-5 md:h-screen md:w-1/2">
					<div
						className="flex h-full w-full flex-col items-center justify-evenly bg-cover bg-center bg-no-repeat md:bg-contain"
						style={{ backgroundImage: `url("${svgBackground}")` }}
					>
						<h1 className="max-w-sm p-2 text-center text-xl dark:text-black md:max-w-sm md:text-2xl">
							Jump back into your projects and connect with your team.
						</h1>
						<img
							className="md:h-[50%] md:w-[50%]"
							src={LoginPic}
							alt="Login photo"
						/>
					</div>
				</div>

				<Card className="border-0 shadow-none md:w-1/3">
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
							//isLoading={isPending}
						/>
					</CardFooter>
				</Card>
				{/*{isError && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <AlertCircle size={20} color="red" />
            <span className="text-red-500">{error?.response?.data?.message as any}</span>
          </div>
        )}*/}
			</form>
		</div>
	);
}
