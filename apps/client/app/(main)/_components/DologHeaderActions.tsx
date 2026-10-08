"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/common/Button/Button";
import { HeaderAccountActions } from "@/components/common/HeaderAccountActions/HeaderAccountActions";
import { track } from "@/lib/amplitude";
import { cn } from "@/lib/utils/cn";
import type { DologAuthRole } from "../_mocks/auth";

const INQUIRY_URL = "https://www.instagram.com/dolog.archive/";
const ARTIST_LOGIN_HREF = "/artist-admin/login";

interface DologHeaderActionsProps {
	role: DologAuthRole;
	// 클릭 이벤트 기록용 페이지 이름
	page: string;
}

/**
 * 두록 헤더 오른쪽 영역 — 로그인 상태에 따라 바뀜
 * 비로그인: 전시 개설 문의 + 로그인 / 로그인: 알림 + 프로필 메뉴
 */
export function DologHeaderActions({ role, page }: DologHeaderActionsProps) {
	if (role === "guest") {
		const handleInquiryClick = () => track("Button Clicked", { button: "전시 개설 문의", page });

		return (
			<div className="flex items-center gap-4">
				{/* 모바일은 텍스트 버튼, 데스크탑은 버튼 */}
				<a
					href={INQUIRY_URL}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleInquiryClick}
					className="text-body2-bold text-light min-[721px]:hidden"
				>
					전시 개설 문의
				</a>
				<Link href={ARTIST_LOGIN_HREF} className="text-body2-bold text-light min-[721px]:hidden">
					로그인
				</Link>

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
				<Link
					href={ARTIST_LOGIN_HREF}
					className={cn(
						buttonVariants({ variant: "assistive", size: "sm" }),
						"hidden text-body2-bold min-[721px]:inline-flex",
					)}
				>
					로그인하기
				</Link>
			</div>
		);
	}

	return <HeaderAccountActions account={role} place="client" size="md" />;
}
