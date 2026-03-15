import { cva } from "class-variance-authority";

export const testPageStyles = {
  // 메인 컨테이너
  wrapper: "flex flex-col items-center justify-center gap-8 py-20",

  // 학교 메인 버튼 (메인 컬러 사용)
  mainButton:
    "bg-(--main-color) px-6 py-3 rounded-lg text-white font-bold shadow-lg transition-transform active:scale-95",

  // 학교별 커스텀 조합 버튼
  customButton: cva("px-6 py-3 rounded-lg border transition-colors", {
    variants: {
      intent: {
        primary: "bg-custom1 text-inverse border-transparent",
        outline: "bg-custom2 text-custom1 border-custom1",
      },
    },
    defaultVariants: {
      intent: "outline",
    },
  }),

  chip: "bg-custom2 text-custom1 px-4 py-1 rounded-full text-body2",

  infoCard:
    "mt-10 p-6 bg-fg-lighter rounded-xl border border-stroke-lighter text-center",
};
