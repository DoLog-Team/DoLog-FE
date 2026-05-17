import { cva, type VariantProps } from "class-variance-authority";

export const scrollTabItemVariants = cva(
	"px-2.5 py-3 text-body2 transition-colors cursor-pointer whitespace-nowrap shrink-0 border-t-2",
	{
		variants: {
			active: {
				true: "text-body2-bold text-light border-stroke-inverse",
				false: "text-lightest border-transparent",
			},
		},
		defaultVariants: {
			active: false,
		},
	},
);

export type ScrollTabItemVariantsProps = VariantProps<typeof scrollTabItemVariants>;
