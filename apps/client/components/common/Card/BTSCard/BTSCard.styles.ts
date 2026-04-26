export const btsCardStyles = {
	// RowCard와 동일한 레이아웃 구조
	wrapper: "flex gap-[12px] items-center w-full",

	// 사진 크기 강제: 64x64
	imageWrapper: "w-[64px] h-[64px] overflow-hidden rounded-md flex-shrink-0",
	image: "w-[64px] h-[64px] object-cover rotate-0",

	// 텍스트 정보 영역
	info: "flex-1 min-w-0 flex flex-col justify-center",

	// 텍스트 스타일
	title: "text-body1-bold text-medium truncate",
	author: "text-body1 text-light",
};
