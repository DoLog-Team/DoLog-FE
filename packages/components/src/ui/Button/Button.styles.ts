import { cva, type VariantProps } from "class-variance-authority";

/**
 * Variant Prop 구조
 * variant : primary | assistive | outline | main | cta
 * size : lg | md | sm | xs
 * iconOnly : boolean
 * round : boolean
 * disabled : boolean
 */

export const buttonVariants = cva(
	// 공통 기본 스타일
	"inline-flex items-center justify-center hover:scale-101 cursor-pointer",
	{
		variants: {
			variant: {
				primary: "",
				assistive: "",
				outline: "border",
				main: "",
				cta: "",
			},
			size: {
				lg: "text-element1 px-4 py-3",
				md: "text-element1 px-4 py-2.5",
				sm: "text-element2 px-3 py-2",
				xs: "text-element2 px-3 py-1.5",
			},
			round: {
				true: "rounded-full",
				false: "rounded-[8px]",
			},
			iconOnly: {
				true: "",
				false: "",
			},
		},
		compoundVariants: [
			// variant 별 스타일 클래스 정의
			{
				variant: "primary",
				class: "bg-fg-inverse text-inverse disabled:bg-lighter disabled:text-disable",
			},
			{
				variant: "assistive",
				class: "bg-fg-lighter text-light disabled:bg-lighter disabled:text-disable",
			},
			{ variant: "outline", class: "border-stroke-lighter text-lighter disabled:text-disable" },
			{
				variant: "main",
				class: "bg-btn-bg text-btn-text disabled:bg-lighter disabled:text-disable",
			},
			{
				variant: "cta",
				class: "bg-cta-bg text-cta-text disabled:bg-lighter disabled:text-disable",
			},

			// icon만 있을 경우 스타일 클래스 정의
			{ iconOnly: true, size: "lg", class: "p-3 w-12 h-12" },
			{ iconOnly: true, size: "md", class: "p-2 w-11 h-11" },
			{ iconOnly: true, size: "sm", class: "p-1.5 w-9 h-9" },
			{ iconOnly: true, size: "xs", class: "p-1 w-8 h-8" },
		],
		defaultVariants: {
			variant: "primary",
			size: "md",
			round: false,
			iconOnly: false,
		},
	},
);

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
