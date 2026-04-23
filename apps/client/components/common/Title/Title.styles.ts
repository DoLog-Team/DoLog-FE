import { cva } from "class-variance-authority";

export const titleLayoutStyles = {
	wrapper: cva("w-full flex flex-col", {
		variants: {
			margin: {
				default: "mt-[20px] mb-[12px]",
				compact: "mt-[16px] mb-[16px]",
			},
		},
		defaultVariants: {
			margin: "default",
		},
	}),

	text: cva("text-strong", {
		variants: {
			size: {
				head1: "text-head1",
				head2: "text-head2",
			},
		},
		defaultVariants: {
			size: "head1",
		},
	}),
};
