"use client";

import Image from "next/image";
import Link from "next/link";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { useAuthRole } from "@/lib/auth/useAuthRole";
import { cn } from "@/lib/utils/cn";
import { DologHeaderActions } from "./DologHeaderActions";

// home: 두록 홈 (NAV-01·04·08) — 로고
// detail: 더보기로 들어가는 목록 페이지 (NAV-02·05·09) — 뒤로가기 + 제목, 오른쪽에 공유 버튼
export type DologHeaderVariant = "home" | "detail";

interface HeaderProps {
	variant?: DologHeaderVariant;
	// detail 전용
	title?: string;
	// detail 전용 — 제목을 보일지 (스크롤해서 큰 제목이 접혔을 때만 보이게 할 때 사용)
	showTitle?: boolean;
	className?: string;
}

export const Header = ({ variant = "home", title, showTitle = true, className }: HeaderProps) => {
	const role = useAuthRole();

	return (
		<DesktopContainer>
			{/* 높이 모바일 44px, 데스크탑 68px (Figma) */}
			<header className={cn("flex h-11 items-center justify-between min-[721px]:h-17", className)}>
				{variant === "home" ? (
					<Link href="/" aria-label="두록 홈">
						<Image src="/images/logo.svg" alt="DoLog" width={47} height={20} priority />
					</Link>
				) : (
					<div className="flex min-w-0 items-center gap-2">
						<Link href="/" aria-label="뒤로가기" className="shrink-0">
							<Image src="/icons/backBtn.svg" alt="" width={24} height={24} />
						</Link>
						<span
							className={cn(
								"truncate text-body1-bold text-strong transition-opacity duration-200",
								showTitle ? "opacity-100" : "pointer-events-none opacity-0",
							)}
						>
							{title}
						</span>
					</div>
				)}
				<DologHeaderActions role={role} variant={variant} page="main" />
			</header>
		</DesktopContainer>
	);
};
