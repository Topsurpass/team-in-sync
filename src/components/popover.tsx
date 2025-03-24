import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PopoverWrapperProps
	extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
	trigger: ReactNode;
	children: ReactNode;
	className?: string;
}

export function PopoverWrapper({
	trigger,
	children,
	className,
	...props
}: PopoverWrapperProps) {
	return (
		<Popover {...props}>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent className={className} {...props}>
				{children}
			</PopoverContent>
		</Popover>
	);
}
