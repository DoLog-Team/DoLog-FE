"use client";

import { useState } from "react";
import { toErrorMessage } from "@/app/artist-admin/(shell)/_api/actions";
import { FormField } from "@/components/common/FormField/FormField";
import { Modal } from "@/components/common/Modal/Modal";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import { Select } from "@/components/common/Select/Select";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import { cancelArtworkSubmission } from "../../_api/submitArtwork";

export interface ArtworkExhibitionLinkSectionProps {
	artworkId: string;
	artworkTitle: string;
	exhibitionName: string;
	hidden: boolean;
	planLimitExceeded: boolean;
	onCancelled: () => void;
}

export const ArtworkExhibitionLinkSection = ({
	artworkId,
	artworkTitle,
	exhibitionName,
	hidden,
	planLimitExceeded,
	onCancelled,
}: ArtworkExhibitionLinkSectionProps) => {
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
	const [isCancelling, setIsCancelling] = useState(false);
	const { notice, showNotice, closeNotice } = useNoticeModal();

	const handleCancelLink = async () => {
		setIsCancelling(true);
		try {
			await cancelArtworkSubmission(artworkId);
			setIsCancelModalOpen(false);
			onCancelled();
		} catch (error) {
			showNotice("출품 취소에 실패했어요", toErrorMessage(error));
		} finally {
			setIsCancelling(false);
		}
	};

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">작품을 표시할 전시회</h2>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-5">
				<FormField label="전시회">
					<Select
						options={[{ label: exhibitionName, value: exhibitionName }]}
						value={exhibitionName}
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

					{hidden && (
						<div className="flex flex-col gap-2 rounded-lg bg-admin2 p-6">
							<span className="text-body1-bold text-error">작품이 숨김처리 됐어요.</span>
							<p className="whitespace-pre-line text-body3 text-black">
								전시 관리자가 작품을 숨김으로 처리하여 전시에서 노출되지 않아요.
							</p>
						</div>
					)}

					{planLimitExceeded && (
						<div className="flex flex-col gap-2 rounded-lg bg-admin2 p-6">
							<span className="text-body1-bold text-error">작품이 전시에서 미노출되어요.</span>
							<p className="whitespace-pre-line text-body3 text-black">
								전시 플랜에 따른 작품 수가 초과되어서 작품이 전시에 미노출되어요. 전시 관리자가 작품
								수를 조정한 후 다시 노출될 수 있어요.
							</p>
						</div>
					)}
				</div>
			</div>

			<Modal
				open={isCancelModalOpen}
				onOpenChange={setIsCancelModalOpen}
				title="전시 출품 취소하기"
				titleTone="danger"
				description={`연결을 해제하면 ${artworkTitle}이 ${exhibitionName}에 더 이상 표시되지 않아요.`}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsCancelModalOpen(false) },
					{
						text: "출품 취소하기",
						variant: "danger",
						disabled: isCancelling,
						onClick: handleCancelLink,
					},
				]}
			/>
			<NoticeModal notice={notice} onClose={closeNotice} />
		</div>
	);
};
