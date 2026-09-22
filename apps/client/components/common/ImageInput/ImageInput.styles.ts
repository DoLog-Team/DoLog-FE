import { cva } from "class-variance-authority";

export const imageInputBoxVariants = cva(
	"flex cursor-pointer flex-col items-center justify-center gap-5 bg-fg-lighter p-8 transition-colors hover:bg-stroke-lighter rounded-[10px]",
);
