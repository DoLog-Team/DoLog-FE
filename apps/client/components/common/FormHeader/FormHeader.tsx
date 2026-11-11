import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { PencilIcon } from "@/components/common/icons/PencilIcon";
import { DotsLoader } from "@/components/common/Spinner/DotsLoader";

export interface FormHeaderProps {
	title: string;
	editableTitle?: boolean;
	onTitleEditClick?: () => void;
	lastSavedAt?: string;
	completionRate?: number;
	onTempSave?: () => void;
	tempSaveDisabled?: boolean;
	saveLabel?: React.ReactNode;
	saveDisabled?: boolean;
	onBack: () => void;
	className?: string;
}

export const FormHeader = ({
	title,
	editableTitle,
	onTitleEditClick,
	lastSavedAt,
	completionRate,
	onTempSave,
	tempSaveDisabled,
	saveLabel = "임시 저장",
	saveDisabled,
	onBack,
	className,
}: FormHeaderProps) => {
	return (
		<header className={className}>
			<div className="flex items-center justify-between py-3">
				<div className="flex items-center gap-2">
					<button type="button" onClick={onBack} aria-label="뒤로가기" className="cursor-pointer">
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
					{completionRate != null ? (
						<span className="text-body3 text-lighter">{completionRate}% 작성 완료</span>
					) : (
						lastSavedAt && (
							<span className="hidden text-body3 text-lighter min-[721px]:inline">
								{lastSavedAt} 마지막 저장
							</span>
						)
					)}
					<Button
						type="button"
						variant="assistive"
						size="sm"
						onClick={onTempSave}
						disabled={tempSaveDisabled || saveDisabled}
						className={tempSaveDisabled ? "px-9.75 py-3.75" : undefined}
					>
						{tempSaveDisabled ? <DotsLoader /> : saveLabel}
					</Button>
				</div>
			</div>
		</header>
	);
};
