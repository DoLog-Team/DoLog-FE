import { cva } from "class-variance-authority";

export const profileCardStyles = {
	wrapper: "flex flex-col gap-4 w-full pt-4",

	top: "flex gap-[12px]",

	image: "w-[150px] h-[200px] object-cover",

	textWrapper: "flex flex-col justify-end flex-1",

	name: "text-head3",
	engName: "text-body2 text-light mt-[4px]",

	bio: "text-body1 text-light leading-[24px] mt-2",
};
