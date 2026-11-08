"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";
import Cropper, { type Area, type MediaSize } from "react-easy-crop";
import { Modal } from "@/components/common/Modal/Modal";
import { cropImage } from "./cropImage";

// 크롭 비율 — QA TC·Figma 기준 7:9 (Figma 크롭 틀 350 × 450)
const CROP_ASPECT = 7 / 9;
const CROP_MAX_WIDTH = 350;
// 화면이 작을 때 크롭 틀이 넘치지 않도록 남기는 여백 (좌우 합, 상단 헤더 + 하단 버튼 영역)
const HORIZONTAL_GUTTER = 25;
const VERTICAL_GUTTER = 264;

// 명세상 확대 1.1배 · 축소 0.9배 · 왼쪽 30도 ("구현 후 추가 조정 필요")
const ZOOM_IN_RATE = 1.1;
const ZOOM_OUT_RATE = 0.9;
const ROTATE_STEP = -30;
const MAX_ZOOM_RATE = 3;

const getCropSize = () => {
	const width = Math.min(
		CROP_MAX_WIDTH,
		window.innerWidth - HORIZONTAL_GUTTER,
		(window.innerHeight - VERTICAL_GUTTER) * CROP_ASPECT,
	);
	return { width, height: width / CROP_ASPECT };
};

interface ProfileImageCropModalProps {
	file: File;
	src: string;
	onClose: () => void;
	onComplete: (file: File) => void;
}

export const ProfileImageCropModal = ({
	file,
	src,
	onClose,
	onComplete,
}: ProfileImageCropModalProps) => {
	const [cropSize] = useState(getCropSize);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [minZoom, setMinZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [croppedArea, setCroppedArea] = useState<Area | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [isSaveFailed, setIsSaveFailed] = useState(false);

	const maxZoom = minZoom * MAX_ZOOM_RATE;
	const changeZoom = (next: number) => setZoom(Math.min(maxZoom, Math.max(minZoom, next)));

	// 처음에는 이미지가 크롭 틀을 빈틈없이 채우는 가장 작은 크기로 시작한다 (Figma: 크롭 틀 350 너비에 맞춘 350 × 525)
	// 이 크기보다 작게 줄이면 크롭 결과에 빈 영역이 생겨서 최소 배율로도 쓴다
	const handleMediaLoaded = ({ width, height }: MediaSize) => {
		const coverZoom = Math.max(cropSize.width / width, cropSize.height / height);
		setMinZoom(coverZoom);
		setZoom(coverZoom);
	};

	const handleSave = async () => {
		if (!croppedArea || isSaving) return;
		setIsSaving(true);
		try {
			onComplete(await cropImage(src, croppedArea, rotation, file));
		} catch {
			setIsSaveFailed(true);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<Dialog.Root open onOpenChange={(open) => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Content
					aria-describedby={undefined}
					className="fixed inset-0 z-modal flex flex-col bg-white outline-none"
				>
					<div className="relative flex-1">
						<Cropper
							image={src}
							crop={crop}
							zoom={zoom}
							rotation={rotation}
							aspect={CROP_ASPECT}
							cropSize={cropSize}
							minZoom={minZoom}
							maxZoom={maxZoom}
							showGrid={false}
							onCropChange={setCrop}
							onZoomChange={changeZoom}
							onRotationChange={setRotation}
							onCropComplete={(_, areaPixels) => setCroppedArea(areaPixels)}
							onMediaLoaded={handleMediaLoaded}
							style={{
								cropAreaStyle: {
									border: "4px solid var(--color-stroke-lightest)",
									color: "rgb(0 0 0 / 0.8)",
								},
							}}
						/>

						{/* 버튼 사이 빈 곳을 눌러도 이미지를 끌 수 있도록 감싼 영역은 포인터를 통과시킨다 */}
						<div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-10">
							<div className="pointer-events-auto relative h-13 w-25">
								<Image src="/icons/cropZoomControl.svg" alt="" width={100} height={52} />
								<button
									type="button"
									aria-label="축소"
									onClick={() => changeZoom(zoom * ZOOM_OUT_RATE)}
									className="absolute inset-y-0 left-0 w-1/2 cursor-pointer rounded-l-full"
								/>
								<button
									type="button"
									aria-label="확대"
									onClick={() => changeZoom(zoom * ZOOM_IN_RATE)}
									className="absolute inset-y-0 right-0 w-1/2 cursor-pointer rounded-r-full"
								/>
							</div>
							<button
								type="button"
								aria-label="왼쪽으로 회전"
								onClick={() => setRotation((prev) => prev + ROTATE_STEP)}
								className="pointer-events-auto flex cursor-pointer items-center rounded-full bg-fg-lighter p-2.5"
							>
								<Image src="/icons/cropRotate.svg" alt="" width={32} height={32} />
							</button>
						</div>
					</div>

					<header className="absolute inset-x-0 top-0 flex h-11 items-center justify-center min-[721px]:h-17">
						<div className="flex w-full max-w-285 items-center justify-between px-4 min-[721px]:px-8">
							<div className="flex items-center">
								<Dialog.Close aria-label="닫기" className="cursor-pointer">
									<Image
										src="/icons/close.svg"
										alt=""
										width={24}
										height={24}
										className="brightness-0 invert"
									/>
								</Dialog.Close>
								<Dialog.Title className="px-0.5 text-body1-bold text-white">
									프로필 이미지 등록
								</Dialog.Title>
							</div>
							<button
								type="button"
								onClick={handleSave}
								disabled={!croppedArea || isSaving}
								className="cursor-pointer px-0.5 text-body2 text-white disabled:cursor-default"
							>
								저장
							</button>
						</div>
					</header>

					<Modal
						open={isSaveFailed}
						onOpenChange={setIsSaveFailed}
						title="저장에 실패했어요."
						description="잠시 뒤 다시 시도해주세요."
						showCloseButton
						actions={[
							{ text: "확인", variant: "assistive", onClick: () => setIsSaveFailed(false) },
						]}
					/>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
