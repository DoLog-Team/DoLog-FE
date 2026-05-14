import { cva, type VariantProps } from "class-variance-authority";

export const scrollTabItemVariants = cva("px-2.5 py-3 text-body2 transition-colors", {
	variants: {
		active: {
			true: "text-body2-bold text-light border-t-2 border-stroke-inverse -mt-0.5",
			false: "text-lightest",
		},
	},
	defaultVariants: {
		active: false,
	},
});

export type ScrollTabItemVariantsProps = VariantProps<typeof scrollTabItemVariants>;
