"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { type TextareaVariantsProps, textareaVariants } from "./Textarea.styles";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		TextareaVariantsProps {
	wrapperClassName?: string;
	errorMessage?: string;
}

export const Textarea = ({
	className,
	wrapperClassName,
	error,
	errorMessage,
	maxLength,
	value,
	defaultValue,
	onChange,
	...props
}: TextareaProps) => {
	const [length, setLength] = useState(String(value ?? defaultValue ?? "").length);

	useEffect(() => {
		if (value !== undefined) {
			setLength(String(value).length);
		}
	}, [value]);

	return (
		<div className={cn("flex flex-col gap-1", wrapperClassName)}>
			<textarea
				className={cn(textareaVariants({ error }), className)}
				maxLength={maxLength}
				value={value}
				defaultValue={defaultValue}
				onChange={(e) => {
					setLength(e.target.value.length);
					onChange?.(e);
				}}
				{...props}
			/>
			{(errorMessage || maxLength != null) && (
				<div className="flex items-center justify-between gap-2">
					{errorMessage && <span className="pl-0.5 text-body3 text-error">{errorMessage}</span>}
					{maxLength != null && (
						<span
							className={cn(
								"ml-auto text-body3",
								length >= maxLength ? "text-error" : "text-lightest",
							)}
						>
							{length}/{maxLength}
						</span>
					)}
				</div>
			)}
		</div>
	);
};
