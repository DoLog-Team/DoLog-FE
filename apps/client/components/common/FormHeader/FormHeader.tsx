import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { PencilIcon } from "@/components/common/icons/PencilIcon";
import { DotsLoader } from "@/components/common/Spinner/DotsLoader";

export interface FormHeaderProps {
	title: string;
	editableTitle?: boolean;
	onTitleEditClick?: () => void;
	lastSavedAt?: string;
	onTempSave?: () => void;
	tempSaveDisabled?: boolean;
	// 화면 크기별로 문구를 바꿀 때는 노드로 넘긴다
	saveLabel?: React.ReactNode;
	// 변경 내용이 없을 때 저장 버튼 비활성
	saveDisabled?: boolean;
	onBack: () => void;
	className?: string;
}

export const FormHeader = ({
	title,
	editableTitle,
	onTitleEditClick,
	lastSavedAt = "2026.05.12 19:22",
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
					{lastSavedAt && (
						// 저장 시간은 데스크탑에서만 표시
						<span className="hidden text-body3 text-lighter min-[721px]:inline">
							{lastSavedAt} 마지막 저장
						</span>
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
