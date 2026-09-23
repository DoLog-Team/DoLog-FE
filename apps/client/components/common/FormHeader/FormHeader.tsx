import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { PencilIcon } from "@/components/common/icons/PencilIcon";

export interface FormHeaderProps {
	title: string;
	editableTitle?: boolean;
	onTitleEditClick?: () => void;
	lastSavedAt?: string;
	onTempSave?: () => void;
	saveLabel?: string;
	onBack: () => void;
	className?: string;
}

export const FormHeader = ({
	title,
	editableTitle,
	onTitleEditClick,
	lastSavedAt = "2026.05.12 19:22",
	onTempSave,
	saveLabel = "임시 저장",
	onBack,
	className,
}: FormHeaderProps) => {
	return (
		<header className={className}>
			<div className="flex items-center justify-between py-3">
				<div className="flex items-center gap-2">
					<button type="button" onClick={onBack} aria-label="뒤로가기">
						<Image src="/icons/backBtn.svg" alt="" width={24} height={24} />
					</button>
					<span className="text-body1-bold text-strong">{title}</span>
					{editableTitle && (
						<button
							type="button"
							onClick={onTitleEditClick}
							aria-label="이름 수정"
							className="flex cursor-pointer items-center justify-center rounded-sm bg-fg-lighter p-[4.5px]"
						>
							<PencilIcon className="text-icon-light" />
						</button>
					)}
				</div>

				<div className="flex items-center gap-3">
					{lastSavedAt && (
						<span className="text-body3 text-lighter">{lastSavedAt} 마지막 저장</span>
					)}
					<Button type="button" variant="assistive" size="sm" onClick={onTempSave}>
						{saveLabel}
					</Button>
				</div>
			</div>
		</header>
	);
};
