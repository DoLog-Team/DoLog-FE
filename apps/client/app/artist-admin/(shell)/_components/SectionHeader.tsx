import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { Title } from "@/components/common/Title/Title";

export const SECTION_TITLE_CLASS =
	"min-w-0 flex-1 px-0.5 min-[721px]:text-[24px] min-[721px]:leading-9";

interface SectionHeaderProps {
	title: string;
	count: number;
	actionLabel: string;
	onAction?: () => void;
}

/**
 * 섹션 제목 + 우측 추가 버튼 + 총 개수
 */
export function SectionHeader({ title, count, actionLabel, onAction }: SectionHeaderProps) {
	return (
		<>
			<div className="flex items-center gap-1 pt-4 pb-5">
				<Title title={title} size="head2" margin="none" className={SECTION_TITLE_CLASS} />
				<Button size="sm" className="gap-0 px-1 text-body2-bold" onClick={onAction}>
					<Image src="/icons/plus.svg" alt="" width={20} height={20} />
					<span className="px-2">{actionLabel}</span>
				</Button>
			</div>
			<p className="px-0.5 pb-2 text-body1 text-lighter">총 {count}개</p>
		</>
	);
}
