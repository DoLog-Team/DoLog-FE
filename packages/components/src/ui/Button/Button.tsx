import React from "react";
import { buttonVariants, type ButtonVariantsProps } from "./Button.styles";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantsProps {}

export const Button = ({ className, variant, size, round, iconOnly, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, round, iconOnly }), className)}
      {...props}
    />
  );
};
