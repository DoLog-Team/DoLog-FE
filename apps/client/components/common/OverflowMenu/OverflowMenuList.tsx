import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface OverflowMenuItem {
	label: string;
	icon: string;
	href?: string;
	onClick?: () => void;
	danger?: boolean;
	// 앞 항목들과 구분선으로 나눌 때 (위험 항목은 자동으로 나뉜다)
	dividerBefore?: boolean;
}

interface OverflowMenuListProps {
	items: OverflowMenuItem[];
	// 항목을 고른 뒤 메뉴를 닫는다
	onSelect: () => void;
	// 목록 위에 붙는 영역 (예: 조회·좋아요 현황)
	header?: React.ReactNode;
	className?: string;
}

/**
 * 오버플로우 메뉴 목록 — 더보기 버튼 메뉴, 작품 관리 메뉴(연필 버튼)에서 같이 쓴다
 */
export function OverflowMenuList({ items, onSelect, header, className }: OverflowMenuListProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-1 rounded-lg border border-stroke-lighter bg-normal p-2 shadow-[0_4px_8px_rgba(0,0,0,0.04)]",
				className,
			)}
		>
			{header}
			{items.map((item, index) => {
				const className = cn(
					"flex w-full cursor-pointer items-center gap-3 rounded-sm p-3 text-body1-bold hover:bg-fg-lighter",
					item.danger ? "text-error" : "text-light",
				);
				// 아이콘은 모양만 쓰고 색은 글자색 토큰을 따른다
				const content = (
					<>
						<span
							aria-hidden
							className={cn(
								"size-6 shrink-0 mask-size-[100%] mask-no-repeat",
								item.danger ? "bg-error" : "bg-icon-light",
							)}
							style={{ maskImage: `url(${item.icon})` }}
						/>
						{item.label}
					</>
				);
				// 위험 항목은 앞 항목들과 구분선으로 분리 (단독 항목이면 생략)
				const hasDivider = (item.danger || item.dividerBefore) && (index > 0 || !!header);

				return (
					<div key={item.label}>
						{hasDivider && <div className="mb-1 h-px bg-stroke-lightest" />}
						{item.href ? (
							<Link href={item.href} className={className} onClick={onSelect}>
								{content}
							</Link>
						) : (
							<button
								type="button"
								className={className}
								onClick={() => {
									onSelect();
									item.onClick?.();
								}}
							>
								{content}
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
}
