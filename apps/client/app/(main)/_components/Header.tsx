"use client";

import Image from "next/image";
import Link from "next/link";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { MOCK_AUTH_ROLE } from "../_mocks/auth";
import { DologHeaderActions } from "./DologHeaderActions";

export const Header = () => {
	return (
		<DesktopContainer>
			{/* 높이 모바일 44px, 데스크탑 68px (Figma) */}
			<header className="flex h-11 items-center justify-between min-[721px]:h-17">
				<Link href="/" aria-label="두록 홈">
					<Image src="/images/logo.svg" alt="DoLog" width={47} height={20} priority />
				</Link>
				{/* TODO: 로그인 상태 API 연결 후 실제 로그인 상태 전달 */}
				<DologHeaderActions role={MOCK_AUTH_ROLE} page="main" />
			</header>
		</DesktopContainer>
	);
};
