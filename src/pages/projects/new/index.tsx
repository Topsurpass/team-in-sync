import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProjectSchema, AddProjectInputs } from "@/validations/project-skills-schema";
import CreateNewProject from "./add-project-form";
import useProject from "@/api/projects/use-mutate-project";

const initialValues = {
	title: "",
	description: "",
	status: "pending",
};

export default function NewProject() {
	const methods = useForm<AddProjectInputs>({
		resolver: zodResolver(addProjectSchema),
		defaultValues: initialValues,
	});

	const { mutate: addNewProject, isPending } = useProject();

	const processForm: SubmitHandler<AddProjectInputs> = async (data) => {
		const transformFormData = {
			title: data.title,
			description: data.description,
			status: data.status,
			roles: data.roles.map((role: any) => ({
				role: role.role,
				number_required: Number(role.number_required),
				skill_ids: role.skills.map((skill: any) => skill.value),
			})),
		};

		addNewProject(transformFormData);
		// console.log(transformFormData);
	};

	return (
		<FormProvider {...methods}>
			<div>
				{/* <pre>{JSON.stringify(methods.watch(), null, 2)}</pre> */}
				<CreateNewProject
					handleSubmit={methods.handleSubmit(processForm)}
					isLoading={isPending}
				/>
			</div>
		</FormProvider>
	);
}
