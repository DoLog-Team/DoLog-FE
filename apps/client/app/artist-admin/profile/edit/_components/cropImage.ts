import type { Area } from "react-easy-crop";

const loadImage = (src: string) =>
	new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = reject;
		image.src = src;
	});

const toBlob = (canvas: HTMLCanvasElement, type: string) =>
	new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(blob) => (blob ? resolve(blob) : reject(new Error("이미지를 만들지 못했어요."))),
			type,
			0.92,
		);
	});

// 회전을 적용한 원본에서 크롭 영역만 잘라 업로드할 파일을 만든다 (area 는 회전된 이미지 기준 픽셀)
export async function cropImage(src: string, area: Area, rotation: number, original: File) {
	const image = await loadImage(src);
	const radian = (rotation * Math.PI) / 180;
	const cos = Math.abs(Math.cos(radian));
	const sin = Math.abs(Math.sin(radian));

	const rotated = document.createElement("canvas");
	rotated.width = image.naturalWidth * cos + image.naturalHeight * sin;
	rotated.height = image.naturalWidth * sin + image.naturalHeight * cos;
	const rotatedContext = rotated.getContext("2d");
	if (!rotatedContext) throw new Error("이미지를 만들지 못했어요.");
	rotatedContext.translate(rotated.width / 2, rotated.height / 2);
	rotatedContext.rotate(radian);
	rotatedContext.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

	const cropped = document.createElement("canvas");
	cropped.width = area.width;
	cropped.height = area.height;
	const croppedContext = cropped.getContext("2d");
	if (!croppedContext) throw new Error("이미지를 만들지 못했어요.");
	croppedContext.drawImage(
		rotated,
		area.x,
		area.y,
		area.width,
		area.height,
		0,
		0,
		area.width,
		area.height,
	);

	const blob = await toBlob(cropped, original.type);
	return new File([blob], original.name, { type: original.type });
}
