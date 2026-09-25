import type React from "react";
import { cn } from "@/lib/utils/cn";

export interface FormFieldProps {
	label: string;
	description?: string;
	required?: boolean;
	children: React.ReactNode;
	className?: string;
}

export const FormField = ({
	label,
	description,
	required,
	children,
	className,
}: FormFieldProps) => {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<div>
				<span className="text-body2-bold text-strong">
					{label} {required && <span className="text-error">*</span>}
				</span>
				{description && (
					<p className="whitespace-pre-line text-body2 text-lighter">{description}</p>
				)}
			</div>
			{children}
		</div>
	);
};
