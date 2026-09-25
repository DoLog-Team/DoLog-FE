"use client";

import { useEffect, useState } from "react";
import { FormField } from "@/components/common/FormField/FormField";
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
}

export const ArtworkExhibitionLinkSection = ({ artworkId }: ArtworkExhibitionLinkSectionProps) => {
	const [link, setLink] = useState<ArtworkExhibitionLink | null>(null);

	useEffect(() => {
		getArtworkExhibitionLink(artworkId).then(setLink);
	}, [artworkId]);

	const notice = link && link.visibility !== "visible" ? VISIBILITY_NOTICE[link.visibility] : null;

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
						onClick={() => {}}
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
		</div>
	);
};
