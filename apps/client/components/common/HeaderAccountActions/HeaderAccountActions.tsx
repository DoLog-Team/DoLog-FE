"use client";

// 헤더 오른쪽 계정 영역 (알림 + 알림 사이드바 + 프로필 메뉴) — 로그인한 계정 공용
// 헤더 틀은 화면마다 따로 만들고, 이 영역만 두록·작가 어드민·슈퍼 어드민 헤더가 같이 씀

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { NotificationSidebar } from "@/components/common/NotificationSidebar/NotificationSidebar";
import { cn } from "@/lib/utils/cn";
import { type AccountPlace, type AccountRole, PROFILE_MENU } from "./profileMenu";
import { useNotifications } from "./useNotifications";

// 헤더 드롭다운 메뉴 모양 — 프로필 메뉴와 슈퍼 어드민 네비게이션 드롭다운(작가·작품 관리)이 같이 씀
export const HEADER_DROPDOWN_ITEM_CLASS =
	"flex h-12 w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded px-3 text-body1-bold text-light hover:bg-fg-lighter";

export const HeaderDropdownList = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<div
		className={cn(
			"absolute top-full z-dropdown flex flex-col rounded-lg border border-stroke-lighter bg-normal p-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.04)]",
			className,
		)}
	>
		{children}
	</div>
);

export const HeaderDropdownDivider = () => <div className="my-1 h-px bg-stroke-lightest" />;

interface HeaderAccountActionsProps {
	account: AccountRole;
	// 어느 화면의 헤더인지 — 두록 화면에서만 내 어드민 홈 링크를 표시
	place: AccountPlace;
	// sm: 20px 고정, md: 모바일 24px · 데스크탑 28px (Figma Navigation)
	size?: "sm" | "md";
	// 알림 사이드바를 열 때 헤더의 다른 메뉴를 닫아야 하면 사용
	onNotificationOpen?: () => void;
	// 헤더에 다른 드롭다운이 있어 하나만 열려야 할 때 프로필 메뉴 열림 상태를 밖에서 관리
	profileMenuOpen?: boolean;
	onProfileMenuOpenChange?: (open: boolean) => void;
}

export function HeaderAccountActions({
	account,
	place,
	size = "sm",
	onNotificationOpen,
	profileMenuOpen,
	onProfileMenuOpenChange,
}: HeaderAccountActionsProps) {
	const router = useRouter();
	const profileRef = useRef<HTMLDivElement>(null);
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
	const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const { notifications, hasUnread, markAllAsRead } = useNotifications(account);

	const iconClassName = size === "md" ? "size-6 min-[721px]:size-7" : "size-5";
	const isMenuOpen = profileMenuOpen ?? uncontrolledOpen;
	const { homeLink, switchLogin } = PROFILE_MENU[account];

	const setMenuOpen = (next: boolean) => {
		if (profileMenuOpen === undefined) setUncontrolledOpen(next);
		onProfileMenuOpenChange?.(next);
	};

	const openNotification = () => {
		setMenuOpen(false);
		onNotificationOpen?.();
		setIsNotificationOpen(true);
	};

	// 알림을 닫으면 확인한 것으로 보고 새 알림 점을 지운다
	const handleNotificationOpenChange = (open: boolean) => {
		setIsNotificationOpen(open);
		if (!open) markAllAsRead();
	};

	// TODO: 인증 저장 방식 확정 후 로그아웃 처리, 지금은 두록 홈으로만 이동
	const handleLogout = () => router.replace("/");

	// 열림 상태를 밖에서 관리하지 않을 때만 바깥 클릭으로 닫는다 (관리하는 쪽에서 처리)
	useEffect(() => {
		if (!uncontrolledOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (!profileRef.current?.contains(e.target as Node)) setUncontrolledOpen(false);
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [uncontrolledOpen]);

	return (
		<div className="flex items-center gap-4">
			<button
				type="button"
				onClick={openNotification}
				aria-label={hasUnread ? "알림 (새 알림 있음)" : "알림"}
				className="relative flex cursor-pointer"
			>
				<Image src="/icons/bell.svg" alt="" width={28} height={28} className={iconClassName} />
				{hasUnread && (
					<span className="absolute top-[12.5%] right-[12.5%] size-1/6 rounded-full bg-error" />
				)}
			</button>

			<div ref={profileRef} className="relative">
				<button
					type="button"
					onClick={() => setMenuOpen(!isMenuOpen)}
					aria-label="프로필 메뉴"
					aria-expanded={isMenuOpen}
					className="flex cursor-pointer"
				>
					<Image src="/icons/profile.svg" alt="" width={28} height={28} className={iconClassName} />
				</button>

				{isMenuOpen && (
					<HeaderDropdownList className="right-0 w-45">
						{place === "client" && (
							<Link
								href={homeLink.href}
								onClick={() => setMenuOpen(false)}
								className={HEADER_DROPDOWN_ITEM_CLASS}
							>
								{homeLink.label}
							</Link>
						)}
						<button
							type="button"
							onClick={() => {
								setMenuOpen(false);
								setIsSwitchModalOpen(true);
							}}
							className={HEADER_DROPDOWN_ITEM_CLASS}
						>
							{switchLogin.label}
						</button>
						<HeaderDropdownDivider />
						<button
							type="button"
							onClick={() => {
								setMenuOpen(false);
								handleLogout();
							}}
							className={cn(HEADER_DROPDOWN_ITEM_CLASS, "text-error")}
						>
							<Image src="/icons/logout.svg" alt="" width={20} height={20} />
							로그아웃하기
						</button>
					</HeaderDropdownList>
				)}
			</div>

			<Modal
				open={isSwitchModalOpen}
				onOpenChange={setIsSwitchModalOpen}
				title="로그아웃하시겠습니까?"
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsSwitchModalOpen(false) },
					{ text: "로그아웃", variant: "primary", onClick: () => router.push(switchLogin.href) },
				]}
			/>

			<NotificationSidebar
				open={isNotificationOpen}
				onOpenChange={handleNotificationOpenChange}
				notifications={notifications}
			/>
		</div>
	);
}
