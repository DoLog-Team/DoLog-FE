import type React from "react";
import { cn } from "../lib/utils";
import { type ButtonVariantsProps, buttonVariants } from "./Button.styles";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonVariantsProps {}

export const Button = ({ className, variant, size, round, iconOnly, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(buttonVariants({ variant, size, round, iconOnly }), className)}
			{...props}
		/>
	);
};
