"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
	onMenuClick?: () => void;
}

export const Header = ({ variant = "logo", title }: HeaderProps) => {
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

	const handleBack = () => {
		const historyLength = window?.history?.length ?? 0;
		const referrer = document?.referrer ?? "";
		const host = window?.location?.host ?? "";

		// 이전 기록이 없거나, 이전 페이지가 우리 서비스 도메인이 아닌 경우
		const hasNoReferrer = !referrer || !referrer.includes(host);

		if (historyLength <= 1 || hasNoReferrer) {
			router.push(baseUrl);
		} else {
			router.back();
		}
	};

	return (
		<>
			<header className="sticky top-0 z-51 border-b border-stroke-lightest bg-normal">
				<DesktopContainer>
					<div className="flex items-center justify-between py-3 h-11">
						{variant === "back" ? (
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={handleBack}
									aria-label="뒤로가기"
									className="cursor-pointer"
								>
									<Image src="/icons/backBtn.svg" alt="뒤로가기" width={24} height={24} />
								</button>
								{title && <span className="text-body1-bold text-strong">{title}</span>}
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
										className={`text-body2 transition-colors ${
											isActive(item.path) ? "text-body2-bold text-strong" : "text-lighter hover:text-light"
										}`}
									>
										{item.label}
									</Link>
								))}
							</nav>
						)}

						{/* 햄버거 (모바일만) */}
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
					</div>
				</DesktopContainer>
			</header>
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
		</>
	);
};
