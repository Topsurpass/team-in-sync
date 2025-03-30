import Modal from "@/components/modal";
import useGlobalProvider from "@/hooks/use-global-provider";
import { EntityType } from "@/types/enum";

export default function AddProject() {
	const { isModalOpen, onModalClose, entity } = useGlobalProvider();

	return (
		<Modal
			title={"Create new project"}
			open={isModalOpen && EntityType.PROJECT === entity}
			className=""
			handleClose={onModalClose}
			size="2xl"
			titleClass="text-black text-md"
			headerClass="bg-gray-100 items-center h-22 border py-4"
		>
			<div className="h-96"></div>
		</Modal>
	);
}
