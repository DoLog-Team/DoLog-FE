const MAX_IMAGE_DIMENSION = 1600;
const JPEG_QUALITY = 0.9;
const WEBP_QUALITY = 0.92;
const SUPPORTED_OUTPUT_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface CompressImageOptions {
	maxDimension?: number;
	quality?: number;
	// 지정하면 원본 포맷과 무관하게 이 포맷으로 강제 변환한다 (예: 미리보기는 항상 jpeg로 작게)
	outputType?: (typeof SUPPORTED_OUTPUT_TYPES)[number];
}

// 선택한 이미지를 캔버스에 한 번 그려서 (1) 디코딩 가능한 이미지인지 검증하고
// (2) 가로/세로가 너무 크면 줄여서 새 File 로 반환한다. 디코딩 실패 시 reject.
export function compressImageFile(file: File, options?: CompressImageOptions): Promise<File> {
	const maxDimension = options?.maxDimension ?? MAX_IMAGE_DIMENSION;

	return new Promise((resolve, reject) => {
		const objectUrl = URL.createObjectURL(file);
		const img = new Image();

		img.onload = () => {
			const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.round(img.width * scale);
			canvas.height = Math.round(img.height * scale);

			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(objectUrl);
				reject(new Error("캔버스 컨텍스트를 가져올 수 없어요."));
				return;
			}

			const outputType =
				options?.outputType ??
				(SUPPORTED_OUTPUT_TYPES.includes(file.type) ? file.type : "image/jpeg");
			if (outputType === "image/jpeg") {
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			const quality =
				options?.quality ??
				(outputType === "image/png"
					? undefined
					: outputType === "image/webp"
						? WEBP_QUALITY
						: JPEG_QUALITY);

			canvas.toBlob(
				(blob) => {
					URL.revokeObjectURL(objectUrl);
					if (!blob) {
						reject(new Error("이미지를 변환하지 못했어요."));
						return;
					}
					const ext = outputType.split("/")[1];
					const name = `${file.name.replace(/\.[^./]+$/, "")}.${ext}`;
					resolve(new File([blob], name, { type: outputType }));
				},
				outputType,
				quality,
			);
		};

		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error("지원하지 않는 이미지 형식이에요."));
		};

		img.src = objectUrl;
	});
}
