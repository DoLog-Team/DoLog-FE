"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button/Button";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { PencilIcon } from "@/components/common/icons/PencilIcon";
import { cn } from "@/lib/utils/cn";

export interface FormHeaderProps {
	title: string;
	editableTitle?: boolean;
	onTitleEditClick?: () => void;
	lastSavedAt?: string;
	onTempSave?: () => void;
	saveLabel?: string;
	onBack?: () => void;
	className?: string;
}

export const FormHeader = ({
	title,
	editableTitle,
	onTitleEditClick,
	lastSavedAt,
	onTempSave,
	saveLabel = "임시 저장",
	onBack,
	className,
}: FormHeaderProps) => {
	const router = useRouter();

	return (
		<header className={cn("border-b border-stroke-lightest", className)}>
			<DesktopContainer className="flex items-center justify-between py-3">
				<div className="flex items-center gap-2">
					<button type="button" onClick={onBack ?? (() => router.back())} aria-label="뒤로가기">
						<Image src="/icons/backBtn.svg" alt="" width={24} height={24} />
					</button>
					<span className="text-body1-bold text-strong">{title}</span>
					{editableTitle && (
						<button
							type="button"
							onClick={onTitleEditClick}
							aria-label="이름 수정"
							className="flex items-center justify-center rounded-sm bg-fg-lighter p-[4.5px]"
						>
							<PencilIcon className="text-icon-light" />
						</button>
					)}
				</div>

				<div className="flex items-center gap-3">
					{lastSavedAt && (
						<span className="text-body3 text-lightest">{lastSavedAt} 마지막 저장</span>
					)}
					<Button type="button" variant="assistive" size="sm" onClick={onTempSave}>
						{saveLabel}
					</Button>
				</div>
			</DesktopContainer>
		</header>
	);
};
