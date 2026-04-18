import { cva } from "class-variance-authority";

export const modalStyles = {
	overlay: "fixed inset-0 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-300 z-[100]",

	content:
		"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-[16px] pt-[12px] rounded-[16px] shadow-2xl transition-all z-[101] outline-none animate-in zoom-in-95 fade-in duration-300 w-[90%] max-w-[380px]",

	title: "text-head2 text-[#070707]",
	description: "text-body1 text-[#606266] mt-[2px] leading-relaxed break-keep whitespace-pre-wrap",

	footer: "flex gap-[8px] mt-[12px]",

	button: cva(
		"flex-1 p-[8px] text-element1 rounded-[8px] transition-all active:scale-95 flex items-center justify-center cursor-pointer min-h-[44px]",
		{
			variants: {
				variant: {
					primary: "bg-cta-bg text-cta-text",

					secondary: "bg-[#F7F7F8] text-[#2F3032]",
				},
			},
			defaultVariants: {
				variant: "primary",
			},
		},
	),
};
