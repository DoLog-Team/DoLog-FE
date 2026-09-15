"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "../Button/Button";
import { imageInputBoxVariants } from "./ImageInput.styles";

export interface ImageInputProps {
	/** 업로드된 이미지 미리보기 URL 목록 */
	images: string[];
	/** 업로드 가능한 최대 개수 (기본 1: 단일 업로드) */
	maxCount?: number;
	onAdd: (files: File[]) => void;
	onRemove: (index: number) => void;
	guideText?: string;
	accept?: string;
	className?: string;
}

export const ImageInput = ({
	images,
	maxCount = 1,
	onAdd,
	onRemove,
	guideText = "JPG, PNG / 용량 5MB 이하 / 가로 세로 1,000PX",
	accept = "image/jpeg,image/png",
	className,
}: ImageInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const remaining = maxCount - images.length;
	const canAdd = remaining > 0;
	const isSingle = maxCount === 1;

	const handleFiles = (fileList: FileList | null) => {
		if (!fileList || fileList.length === 0) return;
		// 단일 모드의 "변경"은 기존 이미지를 교체하는 동작이라 남은 슬롯 수(0)와 무관하게 항상 1개는 받아야 함
		const cap = isSingle ? 1 : remaining;
		onAdd(Array.from(fileList).slice(0, cap));
		if (inputRef.current) inputRef.current.value = "";
	};

	const uploadButton = (
		<button
			type="button"
			onClick={() => inputRef.current?.click()}
			className={cn(imageInputBoxVariants(), "h-45 w-full")}
		>
			<p className="flex flex-col items-center text-center text-body2 text-lighter">
				<span>1개 업로드 가능</span>
				<span>{guideText}</span>
			</p>
			<span className="flex items-center gap-1">
				<Image src="/icons/upload.svg" alt="" width={24} height={24} />
				<span className="text-body1-bold text-light">이미지 업로드 (0/1)</span>
			</span>
		</button>
	);

	return (
		<div className={cn("flex w-full flex-col items-center", className)}>
			<input
				ref={inputRef}
				type="file"
				accept={accept}
				onChange={(e) => handleFiles(e.target.files)}
				className="hidden"
			/>

			{isSingle ? (
				images[0] ? (
					<div className="flex w-full items-center gap-2.5">
						<div className="relative aspect-[360/509] w-40 shrink-0 overflow-hidden bg-fg-light">
							{/* biome-ignore lint/performance/noImgElement: 사용자가 업로드한 로컬/원격 미리보기 URL이라 next/image 최적화 대상이 아님 */}
							<img src={images[0]} alt="업로드한 이미지" className="size-full object-cover" />
						</div>
						<div className="flex flex-1 items-end gap-1.5 self-stretch">
							<Button
								type="button"
								variant="assistive"
								size="xs"
								onClick={() => inputRef.current?.click()}
							>
								변경
							</Button>
							<Button type="button" variant="outline" size="xs" onClick={() => onRemove(0)}>
								삭제
							</Button>
						</div>
					</div>
				) : (
					uploadButton
				)
			) : (
				<div className="flex w-full flex-col items-center gap-4">
					{canAdd && uploadButton}
					{images.length > 0 && (
						<div className="flex w-full flex-wrap items-center gap-2.5">
							{images.map((src, index) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: 업로드 순서가 곧 목록 순서이며 항목은 재정렬되지 않음
									key={index}
									className="relative size-[150px] shrink-0 overflow-hidden bg-fg-light"
								>
									{/* biome-ignore lint/performance/noImgElement: 사용자가 업로드한 로컬/원격 미리보기 URL이라 next/image 최적화 대상이 아님 */}
									<img
										src={src}
										alt={`업로드한 이미지 ${index + 1}`}
										className="size-full object-cover"
									/>
									<button
										type="button"
										onClick={() => onRemove(index)}
										aria-label="이미지 삭제"
										className="absolute right-0 bottom-0 flex size-6 items-center justify-center bg-icon-light"
									>
										<Image
											src="/icons/close.svg"
											alt=""
											width={24}
											height={24}
											className="brightness-0 invert"
										/>
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
