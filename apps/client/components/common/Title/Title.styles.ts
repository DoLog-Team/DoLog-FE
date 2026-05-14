import { cva } from "class-variance-authority";

export const titleStyles = cva("w-full flex flex-col", {
	variants: {
		margin: {
			default: "mt-[20px] mb-[12px]",
			compact: "mt-[16px] mb-[16px]",
			none: "m-0",
		},
		size: {
			head1: "text-head1",
			head2: "text-head2",
			body1: "text-body1",
			"body1-bold": "text-body1-bold",
			body2: "text-body2",
		},
		color: {
			strong: "text-strong",
			light: "text-light",
			lighter: "text-lighter",
		},
	},
	defaultVariants: {
		margin: "default",
		size: "head1",
		color: "strong",
	},
});
