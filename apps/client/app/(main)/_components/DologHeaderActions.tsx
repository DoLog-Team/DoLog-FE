"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/common/Button/Button";
import { HeaderAccountActions } from "@/components/common/HeaderAccountActions/HeaderAccountActions";
import { ShareButton } from "@/components/common/ShareButton/ShareButton";
import { track } from "@/lib/amplitude";
import type { AuthRole } from "@/lib/auth/useAuthRole";
import { cn } from "@/lib/utils/cn";
import { withLoginRedirect } from "@/lib/utils/loginHref";
import type { DologHeaderVariant } from "./Header";

const INQUIRY_URL = "https://www.instagram.com/dolog.archive/";
const ARTIST_LOGIN_HREF = "/artist-admin/login";

interface DologHeaderActionsProps {
	// null: 로그인 상태 확인 전 (서버 렌더링) — 계정 영역을 비워 둔다
	role: AuthRole | null;
	variant: DologHeaderVariant;
	// 클릭 이벤트 기록용 페이지 이름
	page: string;
}

/**
 * 두록 헤더 오른쪽 영역 — 로그인 상태와 헤더 종류에 따라 바뀜
 * 비로그인: (홈) 전시 개설 문의 + 로그인 / (상세) 공유 + 로그인
 * 로그인: (상세만) 공유 + 알림 + 프로필 메뉴
 */
export function DologHeaderActions({ role, variant, page }: DologHeaderActionsProps) {
	return (
		<div className="flex items-center gap-4">
			{variant === "detail" && <ShareButton />}
			{role === null ? null : role === "guest" ? (
				<GuestActions showInquiry={variant === "home"} page={page} />
			) : (
				<HeaderAccountActions account={role} place="client" size="md" />
			)}
		</div>
	);
}

const GuestActions = ({ showInquiry, page }: { showInquiry: boolean; page: string }) => {
	const handleInquiryClick = () => track("Button Clicked", { button: "전시 개설 문의", page });
	// 로그인 후 지금 보던 화면으로 돌아온다
	const loginHref = withLoginRedirect(ARTIST_LOGIN_HREF, usePathname());

	return (
		<>
			{/* 모바일은 텍스트 버튼, 데스크탑은 버튼 */}
			{showInquiry && (
				<a
					href={INQUIRY_URL}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleInquiryClick}
					className="text-body2-bold text-light min-[721px]:hidden"
				>
					전시 개설 문의
				</a>
			)}
			<Link href={loginHref} className="text-body2-bold text-light min-[721px]:hidden">
				로그인
			</Link>

			{showInquiry && (
				<a
					href={INQUIRY_URL}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleInquiryClick}
					className={cn(
						buttonVariants({ variant: "outline", size: "sm" }),
						"hidden text-body2-bold min-[721px]:inline-flex",
					)}
				>
					전시 개설 문의
				</a>
			)}
			<Link
				href={loginHref}
				className={cn(
					buttonVariants({ variant: "assistive", size: "sm" }),
					"hidden text-body2-bold min-[721px]:inline-flex",
				)}
			>
				로그인하기
			</Link>
		</>
	);
};
