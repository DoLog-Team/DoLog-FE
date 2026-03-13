import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "./utils";

const TYPE_MAP = {
  head1: "text-head1 font-semibold",
  head2: "text-head2 font-semibold",
  head3: "text-head3 font-semibold",
  body1: "text-body1 font-regular",
  body1Bold: "text-body1 font-medium",
  body2: "text-body2 font-regular",
  body2Bold: "text-body2 font-medium",
  body3: "text-body3 font-regular",
  body3Bold: "text-body3 font-medium",
  element1: "text-body1 font-semibold",
  element2: "text-body2 font-semibold",
  element3: "text-body3 font-semibold",
} as const;

const typoBaseVariants = cva("font-pretendard break-keep", {
  variants: {
    color: {
      strong: "text-text-strong",
      light: "text-text-light",
      lighter: "text-text-lighter",
      lightest: "text-text-lightest",
      disable: "text-text-disable",
      inverse: "text-text-inverse",
    },
  },
  defaultVariants: {
    color: "strong",
  },
});

export interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typoBaseVariants> {
  type?: keyof typeof TYPE_MAP;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export const Typography = ({
  children,
  type = "body1",
  color,
  as: Component = "p",
  className,
  ...props
}: TypographyProps) => {
  return (
    <Component
      className={cn(typoBaseVariants({ color }), TYPE_MAP[type], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
