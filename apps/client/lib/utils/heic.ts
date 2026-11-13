// 아이폰 사진(HEIC/HEIF)을 JPEG 로 바꾼다 — 크롬 등 대부분의 브라우저는 HEIC 를 그리지 못해
// 미리보기·크롭·압축(캔버스)이 모두 실패하므로, 고르자마자 JPEG 로 바꿔서 이후 흐름은 그대로 쓴다

// 파일 선택창에 HEIC 를 보이게 하는 accept 값
export const HEIC_ACCEPT = "image/heic,image/heif,.heic,.heif";

const HEIC_TYPES = ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"];
const HEIC_EXTENSION = /\.(heic|heif)$/i;
const JPEG_QUALITY = 0.9;

// 데스크톱에서는 type 이 비어 오는 경우가 있어 확장자도 본다
export const isHeicFile = (file: File) =>
	HEIC_TYPES.includes(file.type.toLowerCase()) || HEIC_EXTENSION.test(file.name);

// HEIC 가 아니면 그대로 돌려준다. 변환 라이브러리(약 3MB)는 HEIC 를 골랐을 때만 불러온다
export async function convertHeicToJpeg(file: File): Promise<File> {
	if (!isHeicFile(file)) return file;

	const { heicTo } = await import("heic-to/next");
	const blob = await heicTo({ blob: file, type: "image/jpeg", quality: JPEG_QUALITY });
	const name = `${file.name.replace(/\.[^./]+$/, "")}.jpg`;
	return new File([blob], name, { type: "image/jpeg", lastModified: file.lastModified });
}
