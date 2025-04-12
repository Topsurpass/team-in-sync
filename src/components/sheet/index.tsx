import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetTrigger,
} from "@/components/ui/sheet";

interface ReusableSheetProps {
	trigger?: React.ReactNode;
	children: React.ReactNode;
	title: string;
	className: string;
	description?: string;
	open?: boolean;
	onOpenChange?: (_open: boolean) => void;
}

export default function ReusableSheet({
	trigger,
	children,
	title,
	description,
	open,
	className,
	onOpenChange,
}: ReusableSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent className="overflow-y-scroll sm:max-w-md">
				<SheetHeader className={className}>
					<SheetTitle>{title}</SheetTitle>
					{description && <SheetDescription>{description}</SheetDescription>}
				</SheetHeader>
				<div className="py-4">{children}</div>
			</SheetContent>
		</Sheet>
	);
}
