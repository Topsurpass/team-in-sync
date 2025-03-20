import { Toaster as SonnerToaster } from "sonner";

/**
 * https://sonner.emilkowal.ski/getting-started
 */
export default function ToastProvider() {
	return (
		<SonnerToaster
			position="top-right"
			richColors
			offset={20}
			closeButton
			toastOptions={{
				duration: 5 * 1000,
			}}
		/>
	);
}
