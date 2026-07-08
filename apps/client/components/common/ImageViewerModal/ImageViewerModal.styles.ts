export const imageViewerModalStyles = {
	overlay:
		"fixed inset-0 bg-bg-normal min-[721px]:bg-black/80 z-[100] animate-in fade-in duration-200",

	content: "fixed inset-0 z-[101] flex flex-col outline-none animate-in fade-in duration-200",

	imageArea: "relative flex-1 flex items-center justify-center overflow-hidden",

	transformWrapper: "!w-full !h-full",

	transformContent:
		"!w-full !h-full flex items-center justify-center transform-gpu backface-hidden",

	image: "max-w-full max-h-full min-[721px]:max-w-[calc(100vw-160px)] object-contain select-none",

	zoomControls: "absolute bottom-6 right-4 z-10 flex flex-col gap-2 min-[721px]:hidden",

	zoomButton:
		"p-2 rounded-full bg-white/90 cursor-pointer active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-default",

	desktopCloseButton:
		"hidden min-[721px]:flex fixed z-[102] items-center justify-center w-9 h-9 rounded-full bg-[#F7F7F8] cursor-pointer hover:bg-white transition-colors",
};
