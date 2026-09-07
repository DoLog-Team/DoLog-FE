"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { type InputVariantsProps, inputVariants } from "./Input.styles";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		InputVariantsProps {
	wrapperClassName?: string;
}

export const Input = ({
	className,
	wrapperClassName,
	error,
	maxLength,
	value,
	defaultValue,
	onChange,
	...props
}: InputProps) => {
	const [length, setLength] = useState(String(value ?? defaultValue ?? "").length);

	useEffect(() => {
		if (value !== undefined) {
			setLength(String(value).length);
		}
	}, [value]);

	return (
		<div className={cn("flex flex-col gap-1", wrapperClassName)}>
			<input
				className={cn(inputVariants({ error }), className)}
				maxLength={maxLength}
				value={value}
				defaultValue={defaultValue}
				onChange={(e) => {
					setLength(e.target.value.length);
					onChange?.(e);
				}}
				{...props}
			/>
			{maxLength != null && (
				<span
					className={cn(
						"self-end text-body3",
						length >= maxLength ? "text-error" : "text-lightest",
					)}
				>
					{length}/{maxLength}
				</span>
			)}
		</div>
	);
};
