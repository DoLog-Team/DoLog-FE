import { cva, type VariantProps } from "class-variance-authority";

export const chipVariants = cva(
	"inline-flex items-center justify-center rounded-[8px] cursor-pointer px-2.5 py-2 text-element2 transition-colors whitespace-nowrap shrink-0",
	{
		variants: {
			type: {
				default: "bg-normal text-lighter border border-stroke-lighter",
				primary: "bg-fg-inverse text-normal",
				assistive: "bg-fg-lighter text-lighter",
				custom: "bg-btn-bg text-btn-text",
			},
		},
		defaultVariants: {
			type: "default",
		},
	},
);

export type ChipVariantsProps = VariantProps<typeof chipVariants>;
