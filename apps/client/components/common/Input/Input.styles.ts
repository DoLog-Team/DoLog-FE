import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
	"w-full h-11 px-4 py-3 rounded-lg border bg-bg-normal text-body1-bold outline-none transition-colors " +
		"placeholder:text-lightest disabled:bg-fg-lighter disabled:text-disable",
	{
		variants: {
			error: {
				true: "border-error focus:border-error",
				false: "border-stroke-lighter focus:border-stroke-inverse",
			},
		},
		defaultVariants: {
			error: false,
		},
	},
);

export type InputVariantsProps = VariantProps<typeof inputVariants>;
