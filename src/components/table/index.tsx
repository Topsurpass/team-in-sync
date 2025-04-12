import * as React from "react";
import {
	Card,
	CardContent,
	//CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("relative w-full overflow-auto", className)}
			{...props}
		>
			{children}
		</div>
	)
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div ref={ref} className={cn("border-b", className)} {...props}>
		{children}
	</div>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => (
		<div ref={ref} className={cn("space-y-4", className)} {...props}>
			{children}
		</div>
	)
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("border-t bg-muted/50 font-medium", className)}
		{...props}
	>
		{children}
	</div>
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => (
		<Card ref={ref} className={cn("mb-4 border p-4", className)} {...props}>
			{children}
		</Card>
	)
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => (
		<CardHeader ref={ref} className={cn("pb-2", className)} {...props}>
			<CardTitle>{children}</CardTitle>
		</CardHeader>
	)
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => (
		<CardContent ref={ref} className={cn("pt-2", className)} {...props}>
			{children}
		</CardContent>
	)
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("mt-4 text-sm text-muted-foreground", className)}
		{...props}
	>
		{children}
	</div>
));
TableCaption.displayName = "TableCaption";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
