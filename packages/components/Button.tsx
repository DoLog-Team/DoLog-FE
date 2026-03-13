// 예시 버튼 컴포넌트

import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-mono-900 text-mono-white hover:bg-mono-800",
        secondary: "bg-mono-100 text-mono-900 hover:bg-mono-200",
        outline: "border border-mono-200 text-mono-700 hover:bg-mono-050",
      },

      size: {
        lg: "text-head1 px-6 py-3",
        md: "text-body1 px-4 py-2",
        sm: "text-body3 px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};
