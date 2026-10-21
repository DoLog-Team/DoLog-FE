"use client";

import { useState } from "react";
import { FormField } from "@/components/common/FormField/FormField";
import { Modal } from "@/components/common/Modal/Modal";
import { Radio } from "@/components/common/Radio/Radio";
import type { ArtworkVisibility } from "../_api/updateArtworkVisibility";

const OPTIONS: {
	value: ArtworkVisibility;
	label: string;
	confirmTitle: string;
	confirmDescription: string;
	confirmLabel: string;
}[] = [
	{
		value: "PUBLIC",
		label: "공개",
		confirmTitle: "공개",
		confirmDescription: "작품이 두록 홈과 소속 전시를 통해 모두에게 공개돼요.",
		confirmLabel: "공개하기",
	},
	{
		value: "PRIVATE",
		label: "비공개",
		confirmTitle: "비공개",
		confirmDescription: "작품이 두록 홈과 소속 전시를 포함한 모든 경로에서 비공개돼요.",
		confirmLabel: "비공개하기",
	},
	{
		value: "EXHIBITION_ONLY",
		label: "전시에만 공개",
		confirmTitle: "전시에만 공개하기",
		confirmDescription: "작품이 소속 전시에서만 공개돼요.",
		confirmLabel: "전시에만 공개",
	},
];

export interface ArtworkVisibilitySectionProps {
	value: ArtworkVisibility;
	onChange: (value: ArtworkVisibility) => void;
	disabled?: boolean;
	hasExhibition: boolean;
}

export const ArtworkVisibilitySection = ({
	value,
	onChange,
	disabled,
	hasExhibition,
}: ArtworkVisibilitySectionProps) => {
	const [pendingValue, setPendingValue] = useState<ArtworkVisibility | null>(null);
	const pendingOption = OPTIONS.find((option) => option.value === pendingValue);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">공개 상태</h2>
			</div>
			<div className="min-w-0 flex-1">
				<FormField label="공개 상태">
					<div className="flex flex-wrap gap-6">
						{OPTIONS.map((option) => (
							<Radio
								key={option.value}
								name="artwork-visibility"
								checked={value === option.value}
								onChange={() => {
									if (option.value === value) return;
									setPendingValue(option.value);
								}}
								label={option.label}
								disabled={disabled || (option.value === "EXHIBITION_ONLY" && !hasExhibition)}
							/>
						))}
					</div>
				</FormField>
			</div>

			<Modal
				open={pendingOption != null}
				onOpenChange={(open) => !open && setPendingValue(null)}
				title={pendingOption?.confirmTitle ?? ""}
				description={pendingOption?.confirmDescription}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setPendingValue(null) },
					{
						text: pendingOption?.confirmLabel ?? "",
						variant: "primary",
						disabled,
						onClick: () => {
							if (pendingValue) onChange(pendingValue);
							setPendingValue(null);
						},
					},
				]}
			/>
		</div>
	);
};
