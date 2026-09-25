import type React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: React.ReactNode;
	disabled?: boolean;
	// sm: 20px 고정, md: 모바일 20px · 데스크탑 24px
	size?: "sm" | "md";
	className?: string;
	id?: string;
	name?: string;
}

export const Checkbox = ({
	checked,
	onChange,
	label,
	disabled,
	size = "sm",
	className,
	id,
	name,
}: CheckboxProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const boxSize = size === "md" ? "size-5 min-[721px]:size-6" : "size-5";

	return (
		<label
			className={cn(
				"flex items-center gap-2 text-body2 text-light",
				disabled ? "cursor-not-allowed" : "cursor-pointer",
				className,
			)}
		>
			<span className={cn("relative flex shrink-0 items-center justify-center", boxSize)}>
				<input
					id={inputId}
					name={name ?? inputId}
					type="checkbox"
					checked={checked}
					disabled={disabled}
					onChange={(e) => onChange(e.target.checked)}
					className={cn(
						"peer appearance-none rounded border-[1.5px] border-stroke-lighter checked:border-fg-inverse checked:bg-fg-inverse",
						"disabled:border-stroke-lightest disabled:bg-fg-light disabled:checked:bg-disable",
						boxSize,
					)}
				/>
				<svg
					className="pointer-events-none absolute hidden h-3 w-3 text-inverse peer-checked:block"
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M2 6L5 9L10 3"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			{label}
		</label>
	);
};
