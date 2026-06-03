export const profileCardStyles = {
	wrapper: "flex flex-col w-full min-[721px]:flex-row min-[721px]:gap-8",

	imageWrapper: "flex gap-3 shrink-0 mt-4 mb-4 min-[721px]:block min-[721px]:mt-5 min-[721px]:mb-6",

	image: "h-[212.1px] aspect-[1/1.414] object-cover min-[721px]:w-[180px] min-[721px]:h-auto",

	imageEmpty:
		"h-[212.1px] aspect-[1/1.414] shrink-0 flex items-center justify-center min-[721px]:w-[180px] min-[721px]:h-auto",
	mobileText: "flex flex-col mt-auto min-[721px]:hidden",

	desktopCol: "hidden min-[721px]:flex flex-col",

	rightCol: "flex flex-col flex-1 min-[721px]:gap-4 min-[721px]:mt-5 min-[721px]:mb-6",

	name: "text-head3 text-strong",
	engName: "text-body2 text-light mt-[4px]",

	bio: "text-body1 text-light leading-[24px] mb-6 min-[721px]:mb-0",
};
