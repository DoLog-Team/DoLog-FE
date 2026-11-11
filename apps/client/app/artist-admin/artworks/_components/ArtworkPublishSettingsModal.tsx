"use client";

import { Modal } from "@/components/common/Modal/Modal";
import { Radio } from "@/components/common/Radio/Radio";
import type { ArtworkVisibility } from "../_api/updateArtworkVisibility";

const OPTIONS: { value: ArtworkVisibility; label: string }[] = [
	{ value: "PUBLIC", label: "공개" },
	{ value: "EXHIBITION_ONLY", label: "전시에만 공개" },
	{ value: "PRIVATE", label: "비공개" },
];

export interface ArtworkPublishSettingsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	value: ArtworkVisibility;
	onChange: (value: ArtworkVisibility) => void;
	hasExhibition: boolean;
	isSaving: boolean;
	onConfirm: () => void;
}

export const ArtworkPublishSettingsModal = ({
	open,
	onOpenChange,
	value,
	onChange,
	hasExhibition,
	isSaving,
	onConfirm,
}: ArtworkPublishSettingsModalProps) => (
	<Modal
		open={open}
		onOpenChange={onOpenChange}
		title="전시 공개 설정"
		description={"이제 전시에 올릴 수 있어요.\n공개 설정을 변경할까요?"}
		showCloseButton
		actions={[
			{
				text: "이전으로",
				variant: "assistive",
				onClick: () => onOpenChange(false),
				disabled: isSaving,
			},
			{ text: "저장하기", variant: "primary", onClick: onConfirm, disabled: isSaving },
		]}
	>
		<div className="flex flex-wrap gap-x-6 gap-y-4">
			{OPTIONS.map((option) => (
				<Radio
					key={option.value}
					name="artwork-publish-settings"
					checked={value === option.value}
					onChange={() => onChange(option.value)}
					label={option.label}
					disabled={isSaving || (option.value === "EXHIBITION_ONLY" && !hasExhibition)}
				/>
			))}
		</div>
	</Modal>
);
