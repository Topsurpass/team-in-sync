import { createContext, Dispatch, JSX, useMemo, useReducer } from "react";
import { State, Action } from "@/types";
import { EntityType } from "@/types/enum";

const initialState: State = {
	isModalOpen: false,
	formData: {},
	isEdit: false,
	isViewMore: false,
	entity: "",
};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "OPEN_MODAL":
			return {
				...state,
				isModalOpen: true,
				entity: action.payload,
			};
		case "CLOSE_MODAL":
			return {
				...state,
				isModalOpen: false,
				isEdit: false,
				entity: "",
				formData: {},
			};
		case "SET_EDIT_MODE":
			return {
				...state,
				isModalOpen: true,
				isEdit: true,
				formData: action.payload.data,
				entity: action.payload.entity,
			};
		case "SET_VIEW_MORE_MODE":
			return {
				...state,
				isModalOpen: true,
				isEdit: false,
				isViewMore: true,
				formData: action.payload.data,
				entity: action.payload.entity,
			};
		default:
			return state;
	}
}

interface IEditData {
	data: any;
	entity: EntityType;
}

interface GlobalContextProps extends State {
	onModalClose: () => void;
	onModalOpen: (_arg: any) => void;
	onEdit: (_arg: IEditData) => void;
	dispatch: Dispatch<Action>;
	onViewMore: (_arg: any) => void;
}

export const GlobalContext = createContext<GlobalContextProps>(undefined!);

export function GlobalProvider({ children }: Props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const onModalOpen = (payload: EntityType) => {
		dispatch({
			type: "OPEN_MODAL",
			payload,
		});
	};

	const onModalClose = () => {
		dispatch({
			type: "CLOSE_MODAL",
		});
	};

	const onEdit = ({ data, entity }: IEditData) => {
		dispatch({
			type: "SET_EDIT_MODE",
			payload: {
				data,
				entity,
			},
		});
	};

	const onViewMore = ({ data, entity }: IEditData) => {
		dispatch({
			type: "SET_VIEW_MORE_MODE",
			payload: {
				data,
				entity,
			},
		});
	};

	const contextValue = useMemo(
		() => ({
			...state,
			dispatch,
			onModalOpen,
			onModalClose,
			onEdit,
			onViewMore,
		}),
		[state]
	);

	return (
		<GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
	);
}

type Props = {
	children?: JSX.Element;
};
