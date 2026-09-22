import type React from "react";
import { cn } from "@/lib/utils/cn";

export interface FormFieldProps {
	label: string;
	required?: boolean;
	children: React.ReactNode;
	className?: string;
}

export const FormField = ({ label, required, children, className }: FormFieldProps) => {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<span className="text-body2-bold text-strong">
				{label} {required && <span className="text-error">*</span>}
			</span>
			{children}
		</div>
	);
};
