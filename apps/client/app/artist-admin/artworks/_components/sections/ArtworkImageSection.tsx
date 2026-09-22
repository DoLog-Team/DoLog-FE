"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { FormField } from "@/components/common/FormField/FormField";
import { ImageInput } from "@/components/common/ImageInput/ImageInput";
import { Input } from "@/components/common/Input/Input";
import { useYoutubeLink } from "./useYoutubeLink";

export const ArtworkImageSection = () => {
	const [mainImages, setMainImages] = useState<string[]>([]);
	const { videoUrl, linkStatus, videoTitle, thumbnailUrl, handleVideoUrlChange, handleLink } =
		useYoutubeLink();

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-body2 text-strong">작품 이미지</h2>
				<span className="text-body2 text-lighter">
					미리보기 이미지에 표시될 작품의 대표 이미지를 첨부해주세요.
				</span>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-9">
				<FormField
					label="작품 대표 이미지"
					description={
						"대표 이미지 1장을 선택해주세요.\n추가적 이미지는 작품 상세 정보에 첨부해주세요."
					}
				>
					<ImageInput
						className="w-full"
						images={mainImages}
						maxCount={1}
						onAdd={(files) => setMainImages(files.map((file) => URL.createObjectURL(file)))}
						onRemove={() => setMainImages([])}
					/>
				</FormField>

				<FormField label="작품 동영상" description="youtube 주소를 입력할 수 있습니다.">
					<div className="flex items-start gap-2">
						<Input
							wrapperClassName="flex-1"
							placeholder="https://example.com/example"
							value={videoUrl}
							onChange={(e) => handleVideoUrlChange(e.target.value)}
							error={linkStatus === "error"}
							errorMessage={linkStatus === "error" ? "없는 주소입니다." : undefined}
						/>
						<Button
							type="button"
							className="w-24"
							disabled={!videoUrl || linkStatus === "loading" || linkStatus === "success"}
							onClick={handleLink}
						>
							{linkStatus === "loading"
								? "확인 중"
								: linkStatus === "success"
									? "연동완료"
									: "연동하기"}
						</Button>
					</div>

					{linkStatus === "success" && (
						<div className="flex flex-col items-center gap-2 rounded-lg bg-fg-lighter py-4">
							{/* biome-ignore lint/performance/noImgElement: 유튜브 썸네일 원격 이미지라 next/image 최적화 대상이 아님 */}
							<img
								src={thumbnailUrl}
								alt={videoTitle}
								className="aspect-video w-full max-w-80 rounded-md object-cover"
							/>
							<span className="text-body2-bold text-strong">{videoTitle}</span>
						</div>
					)}
				</FormField>
			</div>
		</div>
	);
};
