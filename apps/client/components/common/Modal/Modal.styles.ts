import { cva } from "class-variance-authority";

export const modalStyles = {
	overlay: "fixed inset-0 bg-deemed backdrop-blur-[2px] animate-in fade-in duration-300 z-overlay",

	content:
		"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-elevate p-[16px] pt-[12px] rounded-[16px] shadow-2xl transition-all z-modal outline-none animate-in zoom-in-95 fade-in duration-300 w-[90%] max-w-[380px]",

	header: "flex items-start justify-between gap-[8px]",
	title: cva("text-head2", {
		variants: {
			tone: {
				default: "text-strong",
				danger: "text-error",
			},
		},
		defaultVariants: {
			tone: "default",
		},
	}),
	closeButton:
		"shrink-0 mt-[4px] p-[2px] rounded-[4px] opacity-60 transition-opacity hover:opacity-100 cursor-pointer",
	description: "text-body1 text-lighter mt-[2px] leading-relaxed break-keep whitespace-pre-wrap",

	body: "mt-[16px]",
	footer: "flex gap-[8px] mt-[12px]",
};
