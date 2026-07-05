"use client";

import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { track } from "@/lib/amplitude";
import { useExhibition } from "../_context/ExhibitionContext";
import { MOCK_BTS_LIST } from "../bts/_mocks/behind-the-scene";
import { Sidebar } from "./Sidebar";

const NAV_ITEMS = [
	{ label: "전시 소개", path: "" },
	{ label: "전시물", path: "/artwork" },
	{ label: "참여한 사람", path: "/artist" },
	{ label: "Behind The Scene", path: "/bts" },
] as const;

interface HeaderProps {
	variant?: "logo" | "back";
	title?: string;
	onBackClick?: () => void;
	showHamburger?: boolean;
}

const HAS_INTERNAL_HISTORY_KEY = "dolog:has-internal-history";

export const Header = ({
	variant = "logo",
	title,
	onBackClick,
	showHamburger = true,
}: HeaderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const { slug, logoImg } = useExhibition();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const baseUrl = `/${slug}`;
	const hasBts = MOCK_BTS_LIST.length > 0;
	const visibleNavItems = NAV_ITEMS.filter((item) => item.label !== "Behind The Scene" || hasBts);

	const isActive = (path: string) => {
		const fullPath = `${baseUrl}${path}`;
		return path === "" ? pathname === fullPath : pathname.startsWith(fullPath);
	};

	// 브라우저 진입 시점의 document.referrer는 앱 내 클라이언트 라우팅 이후에도 갱신되지 않아
	// 실제 앱 내 이동 여부를 반영하지 못한다. 세션 내 실제 페이지 이동 여부를 직접 추적한다.
	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname이 바뀔 때마다 다시 실행되어야 함
	useEffect(() => {
		sessionStorage.setItem(HAS_INTERNAL_HISTORY_KEY, "true");
	}, [pathname]);

	const handleDefaultBack = () => {
		const hasInternalHistory = sessionStorage.getItem(HAS_INTERNAL_HISTORY_KEY) === "true";

		if (hasInternalHistory) {
			router.back();
		} else {
			router.push(baseUrl);
		}
	};

	const handleBack = onBackClick ?? handleDefaultBack;

	return (
		<>
			<header className="sticky top-0 z-51 border-b border-stroke-lightest bg-normal">
				<DesktopContainer>
					<div className="flex items-center justify-between py-3 h-11">
						{variant === "back" ? (
							<div className="flex items-center gap-2 min-w-0">
								<button
									type="button"
									onClick={handleBack}
									aria-label="뒤로가기"
									className="cursor-pointer shrink-0"
								>
									<Image src="/icons/backBtn.svg" alt="뒤로가기" width={24} height={24} />
								</button>
								{title && <span className="text-body1-bold text-strong truncate">{title}</span>}
							</div>
						) : (
							<button type="button" onClick={() => router.push(baseUrl)} className="cursor-pointer">
								{logoImg ? (
									<Image
										src={logoImg}
										alt="전시 로고"
										width={0}
										height={0}
										sizes="100vw"
										className="h-6 w-auto"
										priority
									/>
								) : (
									<Image
										src="/images/exhibitionLogo.svg"
										alt="DoLog"
										width={34}
										height={24}
										priority
									/>
								)}
							</button>
						)}

						{/* 데스크탑 nav */}
						{variant !== "back" && (
							<nav className="hidden min-[721px]:flex items-center gap-6">
								{visibleNavItems.map((item) => (
									<Link
										key={item.label}
										href={`${baseUrl}${item.path}`}
										onClick={() =>
											track("GNB Nav Clicked", { label: item.label, from_page: pathname })
										}
										className={`text-body1-bold whitespace-nowrap transition-colors ${
											isActive(item.path) ? "text-light" : "text-lightest hover:text-lighter"
										}`}
									>
										{item.label}
									</Link>
								))}
								<Button
									onClick={() => {
										track("GNB Nav Clicked", {
											label: "dolog 홈에서 전시 보기",
											from_page: pathname,
										});
										window.open("/", "noopener,noreferrer");
									}}
									size="sm"
									variant="outline"
									className="text-body2 text-lighter whitespace-nowrap flex items-center 
  gap-2 cursor-pointer"
								>
									<Image src="/images/logo.svg" alt="DoLog" width={40} height={14} />
									홈에서 전시 보기
								</Button>
							</nav>
						)}

						{/* 햄버거 (모바일만) */}
						{showHamburger && (
							<button
								type="button"
								onClick={() => {
									const next = !isSidebarOpen;
									setIsSidebarOpen(next);
									if (next) track("GNB Hamburger Clicked", { from_page: pathname });
								}}
								className="cursor-pointer min-[721px]:hidden"
								aria-label={isSidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
							>
								{isSidebarOpen ? (
									<Image src="/icons/close.svg" alt="닫기" width={24} height={24} />
								) : (
									<Image src="/icons/leadingBtn.svg" alt="메뉴" width={24} height={24} />
								)}
							</button>
						)}
					</div>
				</DesktopContainer>
			</header>
			{showHamburger && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
		</>
	);
};
