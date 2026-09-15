import { cva, type VariantProps } from "class-variance-authority";

export const tabItemVariants = cva(
	"flex items-center gap-[6px] text-body4-bold transition-colors cursor-pointer whitespace-nowrap border-b-2 border-stroke-inverse px-[14px] py-[12px]",
	{
		variants: {
			active: {
				true: "text-body4-bold text-light",
				false: "text-body4 text-lightest border-transparent",
			},
		},
		defaultVariants: {
			active: false,
		},
	},
);

export type TabItemVariantsProps = VariantProps<typeof tabItemVariants>;
