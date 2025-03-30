import { useContext } from "react";

import { GlobalContext } from "@/providers/global-provider";

const useGlobalProvider = () => {
	return useContext(GlobalContext);
};

export default useGlobalProvider;
