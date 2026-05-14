import { cva } from "class-variance-authority";

export const dividerStyles = {
	wrapper: cva("flex flex-col justify-center", {
		variants: {
			spacing: {
				none: "py-0",
				sm: "py-2",
				md: "py-4",
				lg: "py-5",
			},
			fullBleed: {
				true: "w-[calc(100%+2rem)] -mx-4",
				false: "w-full",
			},
		},
		defaultVariants: {
			spacing: "lg",
			fullBleed: true,
		},
	}),

	line: cva("w-full", {
		variants: {
			thickness: {
				thin: "h-[1px]",
				medium: "h-[2px]",
				thick: "h-[4px]",
			},
			color: {
				lightest: "bg-stroke-lightest",
				lighter: "bg-stroke-lighter",
			},
		},
		defaultVariants: {
			thickness: "thick",
			color: "lightest",
		},
	}),
};
