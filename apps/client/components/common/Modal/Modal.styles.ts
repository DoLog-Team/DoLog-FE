import { cva } from "class-variance-authority";

// 모달은 다크 테마에서도 항상 라이트로 고정한다.
// 테마를 타는 토큰(text-strong, bg-normal 등)을 쓰면 다크에서 흰 카드 위에 흰 글자가 되므로
// 여기서는 의도적으로 고정 색상값을 쓴다.
export const modalStyles = {
	overlay: "fixed inset-0 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-300 z-[100]",

	content:
		"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#070707] p-[16px] pt-[12px] rounded-[16px] shadow-2xl transition-all z-[101] outline-none animate-in zoom-in-95 fade-in duration-300 w-[90%] max-w-[380px]",

	header: "flex items-start justify-between gap-[8px]",
	title: cva("text-head2", {
		variants: {
			tone: {
				default: "text-[#070707]",
				danger: "text-[#ef4444]",
			},
		},
		defaultVariants: {
			tone: "default",
		},
	}),
	closeButton:
		"shrink-0 mt-[4px] p-[2px] rounded-[4px] opacity-60 transition-opacity hover:opacity-100 cursor-pointer",
	description: "text-body1 text-[#606266] mt-[2px] leading-relaxed break-keep whitespace-pre-wrap",

	body: "mt-[16px]",
	footer: "flex gap-[8px] mt-[12px]",

	button: cva(
		"flex-1 p-[8px] text-element1 rounded-[8px] transition-all active:scale-95 flex items-center justify-center cursor-pointer min-h-[44px] disabled:cursor-not-allowed disabled:active:scale-100 disabled:bg-[#f7f7f8] disabled:text-[#d2d3d5]",
		{
			variants: {
				variant: {
					primary: "bg-cta-bg text-cta-text",

					neutral: "bg-[#1b1c1d] text-white",

					danger: "bg-[#ef4444] text-white",

					secondary: "bg-[#f7f7f8] text-[#2f3032]",
				},
			},
			defaultVariants: {
				variant: "primary",
			},
		},
	),
};
