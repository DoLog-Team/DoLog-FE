"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormField } from "@/components/common/FormField/FormField";
import { Modal } from "@/components/common/Modal/Modal";
import { Select } from "@/components/common/Select/Select";
import {
	type ArtworkExhibitionLink,
	getArtworkExhibitionLink,
} from "../../_api/getArtworkExhibitionLink";

const VISIBILITY_NOTICE = {
	overLimit: {
		title: "작품이 전시에서 미노출되어요.",
		description:
			"전시 플랜에 따른 작품 수가 초과되어서 작품이 전시에 미노출되어요.\n전시 관리자가 작품 수를 조정한 후 다시 노출될 수 있어요.",
	},
	hidden: {
		title: "작품이 숨김처리 됐어요.",
		description: "전시 관리자가 작품을 숨김으로 처리하여 전시에서 노출되지 않아요.",
	},
} as const;

export interface ArtworkExhibitionLinkSectionProps {
	artworkId: string;
	artworkTitle: string;
}

export const ArtworkExhibitionLinkSection = ({
	artworkId,
	artworkTitle,
}: ArtworkExhibitionLinkSectionProps) => {
	const router = useRouter();
	const [link, setLink] = useState<ArtworkExhibitionLink | null>(null);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

	useEffect(() => {
		getArtworkExhibitionLink(artworkId)
			.then(setLink)
			.catch(() => {});
	}, [artworkId]);

	const notice = link && link.visibility !== "visible" ? VISIBILITY_NOTICE[link.visibility] : null;

	const handleCancelLink = () => {
		// TODO: 실제 출품 취소 API 연동 필요
		router.push("/mypage");
	};

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">작품을 표시할 전시회</h2>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-5">
				<FormField label="전시회">
					<Select
						options={link ? [{ label: link.exhibitionName, value: link.exhibitionName }] : []}
						value={link?.exhibitionName}
						onChange={() => {}}
						placeholder="이전 모달에서 연동한 전시회 이름이 표시됨"
						disabled
					/>
				</FormField>
				<div className="flex flex-col gap-9">
					<button
						type="button"
						onClick={() => setIsCancelModalOpen(true)}
						className="w-fit text-body2-bold text-error underline cursor-pointer"
					>
						출품 취소하기
					</button>

					{notice && (
						<div className="flex flex-col gap-2 rounded-lg bg-admin2 p-6">
							<span className="text-body1-bold text-error">{notice.title}</span>
							<p className="whitespace-pre-line text-body3 text-black">{notice.description}</p>
						</div>
					)}
				</div>
			</div>

			<Modal
				open={isCancelModalOpen}
				onOpenChange={setIsCancelModalOpen}
				title="전시 출품 취소하기"
				titleTone="danger"
				description={
					link
						? `연결을 해제하면 ${artworkTitle}이 ${link.exhibitionName}에 더 이상 표시되지 않아요.`
						: undefined
				}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsCancelModalOpen(false) },
					{ text: "출품 취소하기", variant: "danger", onClick: handleCancelLink },
				]}
			/>
		</div>
	);
};
