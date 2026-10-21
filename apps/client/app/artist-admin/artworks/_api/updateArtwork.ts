import { authApiClient } from "@/lib/api/instance";

// 작품 기본 정보 부분 수정 (보낸 필드만 반영)
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
	productionEndYear?: string;
	productionEndMonth?: string;
	productionEndDay?: string;
	youtubeUrl?: string;
	showPurchaseButton: boolean;
	mainImageFile: File | null;
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

	appendIfPresent("category", input.category);
	appendIfPresent("shortIntro", input.shortIntro);
	appendIfPresent("width", input.width);
	appendIfPresent("height", input.height);
	appendIfPresent("depth", input.depth);
	appendIfPresent("productionStartYear", input.productionStartYear);
	appendIfPresent("productionStartMonth", input.productionStartMonth);
	appendIfPresent("productionStartDay", input.productionStartDay);
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
}

// 작품 부가 정보(재료·사이즈·위치 이미지)만 부분 수정 — 출품 화면의 "부가 정보" 탭에서 쓴다
export async function updateArtworkAdditionalInfo(
	artworkId: string,
	input: UpdateArtworkAdditionalInfoInput,
): Promise<void> {
	const formData = new FormData();

	if (input.width) formData.append("width", input.width);
	if (input.height) formData.append("height", input.height);
	if (input.depth) formData.append("depth", input.depth);
	if (input.locationMapFile) formData.append("locationMapFile", input.locationMapFile);

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
