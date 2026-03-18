import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  // 공통 기본 스타일
  "inline-flex items-center justify-center rounded-md hover:scale-105 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "text-strong hover:text-lighter",
        secondary: "text-light hover:bg-mono-200",
        outline: "border border-stroke-lighter hover:text-lightest",
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

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
