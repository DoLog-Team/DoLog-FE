"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { NotificationSidebar } from "@/components/common/NotificationSidebar/NotificationSidebar";
import { cn } from "@/lib/utils/cn";
import { MOCK_NOTIFICATIONS } from "../_mocks/notifications";
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

const ARTIST_LOGIN_HREF = "/artist-admin/login";

const MENU_ITEM_CLASS =
	"flex h-12 w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded px-3 text-body1-bold text-light hover:bg-fg-lighter";

type OpenMenu = "artists" | "artworks" | "profile" | null;

export function ExhibitionAdminHeader() {
	const pathname = usePathname();
	const router = useRouter();
	const headerRef = useRef<HTMLElement>(null);
	const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	// 알림 API 연결 전 임시 데이터
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

	const hasUnread = notifications.some((notification) => !notification.isRead);

	// 알림을 닫으면 확인한 것으로 보고 새 알림 점을 지운다
	const handleNotificationOpenChange = (open: boolean) => {
		setIsNotificationOpen(open);
		if (!open) setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
	};

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

	// 인증 저장 방식 확정 전이라 두록 홈으로 보내기만 한다
	const handleLogout = () => router.replace("/");

	return (
		<>
			<header
				ref={headerRef}
				className="sticky top-0 z-51 w-full border-b border-stroke-lightest bg-normal"
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
						<button
							type="button"
							onClick={() => {
								closeMenu();
								setIsSidebarOpen(false);
								setIsNotificationOpen(true);
							}}
							aria-label={hasUnread ? "알림 (새 알림 있음)" : "알림"}
							className="relative cursor-pointer"
						>
							<Image
								src="/icons/bell.svg"
								alt=""
								width={28}
								height={28}
								className="size-6 min-[721px]:size-7"
							/>
							{hasUnread && (
								<span className="absolute top-[12.5%] right-[12.5%] size-1 rounded-full bg-error min-[721px]:size-1.5" />
							)}
						</button>

						<div className="relative">
							<button
								type="button"
								onClick={() => toggleMenu("profile")}
								aria-label="프로필 메뉴"
								aria-expanded={openMenu === "profile"}
								className="flex cursor-pointer"
							>
								<Image
									src="/icons/profile.svg"
									alt=""
									width={28}
									height={28}
									className="size-6 min-[721px]:size-7"
								/>
							</button>
							{openMenu === "profile" && (
								<MenuList className="right-0 w-45">
									<button
										type="button"
										onClick={() => {
											closeMenu();
											setIsSwitchModalOpen(true);
										}}
										className={MENU_ITEM_CLASS}
									>
										작가 로그인
									</button>
									<MenuDivider />
									<button
										type="button"
										onClick={handleLogout}
										className={cn(MENU_ITEM_CLASS, "text-error")}
									>
										<Image src="/icons/logout.svg" alt="" width={20} height={20} />
										로그아웃하기
									</button>
								</MenuList>
							)}
						</div>

						<button
							type="button"
							onClick={() => {
								closeMenu();
								setIsNotificationOpen(false);
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

			<NotificationSidebar
				open={isNotificationOpen}
				onOpenChange={handleNotificationOpenChange}
				notifications={notifications}
			/>

			<Modal
				open={isSwitchModalOpen}
				onOpenChange={setIsSwitchModalOpen}
				title="로그아웃하시겠습니까?"
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsSwitchModalOpen(false) },
					{ text: "로그아웃", variant: "primary", onClick: () => router.push(ARTIST_LOGIN_HREF) },
				]}
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
				<MenuList className="right-0 w-45">
					{items.map((item, index) => (
						<Fragment key={item.href}>
							{index > 0 && <MenuDivider />}
							<Link href={item.href} onClick={onSelect} className={MENU_ITEM_CLASS}>
								{item.label}
							</Link>
						</Fragment>
					))}
				</MenuList>
			)}
		</div>
	);
};

const MenuList = ({ className, children }: { className?: string; children: React.ReactNode }) => (
	<div
		className={cn(
			"absolute top-full z-10 flex flex-col rounded-lg border border-stroke-lighter bg-normal p-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.04)]",
			className,
		)}
	>
		{children}
	</div>
);

const MenuDivider = () => <div className="my-1 h-px bg-stroke-lightest" />;
