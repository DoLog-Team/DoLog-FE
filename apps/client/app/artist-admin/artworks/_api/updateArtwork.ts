import { authApiClient } from "@/lib/api/instance";

const appendSize = (
	formData: FormData,
	key: "width" | "height" | "depth",
	value: string | undefined,
) => {
	if (value) formData.append(key, value);
	else formData.append(`clear${key[0].toUpperCase()}${key.slice(1)}`, "true");
};

export async function renameArtwork(artworkId: string, title: string): Promise<void> {
	const formData = new FormData();
	formData.append("title", title);

	await authApiClient<void>(`/artworks/${artworkId}`, {
		method: "PATCH",
		body: formData,
	});
}

export interface UpdateArtworkBasicInfoInput {
	category?: string;
	shortIntro?: string;
	materials: string[];
	width?: string;
	height?: string;
	depth?: string;
	productionStartYear?: string;
	productionStartMonth?: string;
	productionStartDay?: string;
	clearProductionStartDate?: boolean;
	productionEndYear?: string;
	productionEndMonth?: string;
	productionEndDay?: string;
	youtubeUrl?: string;
	showPurchaseButton: boolean;
	mainImageFile: File | null;
	clearMainImage?: boolean;
}

// 작품 기본/부가/이미지/구매 정보 임시저장 (필수값 무관, 보낸 필드만 반영)
export async function updateArtworkBasicInfo(
	artworkId: string,
	input: UpdateArtworkBasicInfoInput,
): Promise<void> {
	const formData = new FormData();

	const appendIfPresent = (key: string, value: string | undefined) => {
		if (value) formData.append(key, value);
	};

	if (input.category !== undefined) formData.append("category", input.category);
	appendIfPresent("shortIntro", input.shortIntro);
	appendSize(formData, "width", input.width);
	appendSize(formData, "height", input.height);
	appendSize(formData, "depth", input.depth);
	appendIfPresent("productionStartYear", input.productionStartYear);
	appendIfPresent("productionStartMonth", input.productionStartMonth);
	appendIfPresent("productionStartDay", input.productionStartDay);
	if (input.clearProductionStartDate) formData.append("clearProductionStartDate", "true");
	appendIfPresent("productionEndYear", input.productionEndYear);
	appendIfPresent("productionEndMonth", input.productionEndMonth);
	appendIfPresent("productionEndDay", input.productionEndDay);
	appendIfPresent("youtubeUrl", input.youtubeUrl);
	formData.append("showPurchaseButton", String(input.showPurchaseButton));

	// 보내면 전체 교체, 빈 값 하나만 보내면 전부 삭제(백엔드 스펙)
	if (input.materials.length > 0) {
		for (const material of input.materials) formData.append("materials", material);
	} else {
		formData.append("materials", "");
	}

	if (input.mainImageFile) formData.append("mainImageFile", input.mainImageFile);
	else if (input.clearMainImage) formData.append("clearMainImage", "true");

	await authApiClient<void>(`/artworks/${artworkId}`, {
		method: "PATCH",
		body: formData,
	});
}

export interface UpdateArtworkAdditionalInfoInput {
	materials: string[];
	width?: string;
	height?: string;
	depth?: string;
	locationMapFile?: File | null;
	mainImageFile?: File | null;
	clearLocationMap?: boolean;
	clearMainImage?: boolean;
}

// 작품 부가 정보(대표 이미지·재료·사이즈·위치 이미지)만 부분 수정 — 출품 화면에서 쓴다
export async function updateArtworkAdditionalInfo(
	artworkId: string,
	input: UpdateArtworkAdditionalInfoInput,
): Promise<void> {
	const formData = new FormData();

	appendSize(formData, "width", input.width);
	appendSize(formData, "height", input.height);
	appendSize(formData, "depth", input.depth);
	if (input.locationMapFile) formData.append("locationMapFile", input.locationMapFile);
	else if (input.clearLocationMap) formData.append("clearLocationMap", "true");
	if (input.mainImageFile) formData.append("mainImageFile", input.mainImageFile);
	else if (input.clearMainImage) formData.append("clearMainImage", "true");

	if (input.materials.length > 0) {
		for (const material of input.materials) formData.append("materials", material);
	} else {
		formData.append("materials", "");
	}

	await authApiClient<void>(`/artworks/${artworkId}`, {
		method: "PATCH",
		body: formData,
	});
}
