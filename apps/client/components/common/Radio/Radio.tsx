import type React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface RadioProps {
	checked: boolean;
	onChange?: () => void;
	label?: React.ReactNode;
	disabled?: boolean;
	name?: string;
	className?: string;
	id?: string;
}

export const Radio = ({ checked, onChange, label, disabled, name, className, id }: RadioProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	return (
		<label
			className={cn(
				"flex items-center gap-2 text-body2 text-light",
				disabled ? "cursor-not-allowed" : "cursor-pointer",
				className,
			)}
		>
			<span className="relative flex size-5 shrink-0 items-center justify-center">
				<input
					id={inputId}
					name={name}
					type="radio"
					checked={checked}
					disabled={disabled}
					onChange={() => onChange?.()}
					className={cn(
						"size-5 appearance-none rounded-full border-[1.5px] border-stroke-lighter bg-bg-normal",
						"checked:border-[5px] checked:border-fg-inverse",
						"disabled:border-stroke-lightest disabled:bg-fg-light disabled:checked:border-disable",
					)}
				/>
			</span>
			{label}
		</label>
	);
};
