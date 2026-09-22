import type React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: React.ReactNode;
	disabled?: boolean;
	className?: string;
	id?: string;
	name?: string;
}

export const Checkbox = ({
	checked,
	onChange,
	label,
	disabled,
	className,
	id,
	name,
}: CheckboxProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	return (
		<label
			className={cn(
				"flex items-center gap-2 text-body2 text-light",
				disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
				className,
			)}
		>
			<span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
				<input
					id={inputId}
					name={name ?? inputId}
					type="checkbox"
					checked={checked}
					disabled={disabled}
					onChange={(e) => onChange(e.target.checked)}
					className="peer h-5 w-5 appearance-none rounded border-[1.5px] border-stroke-lighter checked:border-strong checked:bg-strong"
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
