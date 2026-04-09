import { cva } from "class-variance-authority";

export const testPageStyles = {
  // 메인 컨테이너
  wrapper: "flex flex-col items-center justify-center gap-8 py-20",

  // CTA 버튼 (메인 액션)
  mainButton:
    "bg-cta-bg text-cta-text px-6 py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-95",

  // 기본 버튼/chip 조합
  customButton: cva("px-6 py-3 rounded-lg border transition-colors", {
    variants: {
      intent: {
        primary: "bg-cta-bg text-cta-text border-transparent",
        outline: "bg-btn-bg text-btn-text border-btn-text",
      },
    },
    defaultVariants: {
      intent: "outline",
    },
  }),

  chip: "bg-btn-bg text-btn-text px-4 py-1 rounded-full text-body2",

  infoCard:
    "mt-10 p-6 bg-fg-lighter rounded-xl border border-stroke-lighter text-center",
};
