"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import {
	HEADER_DROPDOWN_ITEM_CLASS,
	HeaderAccountActions,
	HeaderDropdownDivider,
	HeaderDropdownList,
} from "@/components/common/HeaderAccountActions/HeaderAccountActions";
import { cn } from "@/lib/utils/cn";
import { ExhibitionAdminSidebar } from "./ExhibitionAdminSidebar";
import { getActiveHref } from "./getActiveHref";

interface MenuItem {
	label: string;
	href: string;
}

const ARTIST_MENU: MenuItem[] = [
	{ label: "참여중인 작가 관리", href: "/admin/artists" },
	{ label: "대기중인 작가 관리", href: "/admin/artists/pending" },
];

const ARTWORK_MENU: MenuItem[] = [
	{ label: "전체 작품 관리", href: "/admin/artworks" },
	{ label: "숨긴 작품 관리", href: "/admin/artworks/hidden" },
];

type OpenMenu = "artists" | "artworks" | "profile" | null;

export function ExhibitionAdminHeader() {
	const pathname = usePathname();
	const router = useRouter();
	const headerRef = useRef<HTMLElement>(null);
	const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// 메뉴 바깥을 누르면 닫는다
	useEffect(() => {
		if (!openMenu) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [openMenu]);

	const toggleMenu = (menu: OpenMenu) => setOpenMenu((prev) => (prev === menu ? null : menu));
	const closeMenu = () => setOpenMenu(null);

	// 모바일 사이드바 로그아웃 — 인증 저장 방식 확정 전이라 두록 홈으로 보내기만 한다
	const handleLogout = () => router.replace("/");

	return (
		<>
			<header
				ref={headerRef}
				className="sticky top-0 z-header w-full border-b border-stroke-lightest bg-normal"
			>
				<div className="mx-auto flex h-11 w-full max-w-285 items-center px-4 min-[721px]:h-17 min-[721px]:px-8">
					<div className="flex flex-1 items-center">
						<Link href="/admin" className="text-body1-bold text-strong">
							두록 어드민
						</Link>

						<nav className="hidden items-center gap-5 pl-8 min-[721px]:flex">
							<NavDropdown
								label="작가 관리"
								items={ARTIST_MENU}
								pathname={pathname}
								isOpen={openMenu === "artists"}
								onToggle={() => toggleMenu("artists")}
								onSelect={closeMenu}
							/>
							<NavDropdown
								label="작품 관리"
								items={ARTWORK_MENU}
								pathname={pathname}
								isOpen={openMenu === "artworks"}
								onToggle={() => toggleMenu("artworks")}
								onSelect={closeMenu}
							/>
							<Link
								href="/admin/exhibitions"
								className={cn(
									"text-body1-bold",
									pathname.startsWith("/admin/exhibitions") ? "text-light" : "text-lightest",
								)}
							>
								전시 관리
							</Link>
						</nav>
					</div>

					<div className="flex items-center gap-4">
						<HeaderAccountActions
							account="admin"
							place="admin"
							size="md"
							onNotificationOpen={() => {
								closeMenu();
								setIsSidebarOpen(false);
							}}
							profileMenuOpen={openMenu === "profile"}
							onProfileMenuOpenChange={(open) => setOpenMenu(open ? "profile" : null)}
						/>

						<button
							type="button"
							onClick={() => {
								closeMenu();
								setIsSidebarOpen((prev) => !prev);
							}}
							aria-label={isSidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
							className="cursor-pointer min-[721px]:hidden"
						>
							<Image
								src={isSidebarOpen ? "/icons/close.svg" : "/icons/leadingBtn.svg"}
								alt=""
								width={24}
								height={24}
							/>
						</button>
					</div>
				</div>
			</header>

			<ExhibitionAdminSidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onLogout={handleLogout}
			/>
		</>
	);
}

interface NavDropdownProps {
	label: string;
	items: MenuItem[];
	pathname: string;
	isOpen: boolean;
	onToggle: () => void;
	onSelect: () => void;
}

const NavDropdown = ({ label, items, pathname, isOpen, onToggle, onSelect }: NavDropdownProps) => {
	const isActive = Boolean(
		getActiveHref(
			pathname,
			items.map((item) => item.href),
		),
	);

	return (
		<div className="relative">
			<button
				type="button"
				onClick={onToggle}
				aria-expanded={isOpen}
				className={cn(
					"flex h-7 cursor-pointer items-center gap-0.5 text-body1-bold",
					isActive ? "text-light" : "text-lightest",
				)}
			>
				{label}
				<Image
					src="/icons/caretDown.svg"
					alt=""
					width={20}
					height={20}
					className={cn("transition-transform", isOpen && "rotate-180")}
				/>
			</button>
			{isOpen && (
				<HeaderDropdownList className="right-0 w-45">
					{items.map((item, index) => (
						<Fragment key={item.href}>
							{index > 0 && <HeaderDropdownDivider />}
							<Link href={item.href} onClick={onSelect} className={HEADER_DROPDOWN_ITEM_CLASS}>
								{item.label}
							</Link>
						</Fragment>
					))}
				</HeaderDropdownList>
			)}
		</div>
	);
};
