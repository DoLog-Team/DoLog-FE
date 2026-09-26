"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { getActiveHref } from "./getActiveHref";

const SIDEBAR_MENU = [
	{ label: "작가 관리", href: "/admin/artists" },
	{ label: "대기중인 작가", href: "/admin/artists/pending" },
	{ label: "작품 관리", href: "/admin/artworks" },
	{ label: "숨긴 작품 관리", href: "/admin/artworks/hidden" },
	{ label: "전시 관리", href: "/admin/exhibitions" },
] as const;

interface ExhibitionAdminSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	onLogout: () => void;
}

export const ExhibitionAdminSidebar = ({
	isOpen,
	onClose,
	onLogout,
}: ExhibitionAdminSidebarProps) => {
	const pathname = usePathname();
	const activeHref = getActiveHref(
		pathname,
		SIDEBAR_MENU.map((item) => item.href),
	);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<div className="min-[721px]:hidden">
			<div
				className={cn(
					"fixed inset-x-0 top-11 z-sidebar transition-all duration-300 ease-in-out",
					isOpen
						? "pointer-events-auto translate-y-0 opacity-100"
						: "pointer-events-none -translate-y-full opacity-0",
				)}
			>
				<nav className="flex flex-col gap-3 rounded-b-[20px] bg-elevate px-4 pt-4 pb-5 shadow-[0_0_20px_0_rgba(0,0,0,0.2)]">
					{SIDEBAR_MENU.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							onClick={onClose}
							className={cn(
								"py-1",
								item.href === activeHref
									? "text-body1-bold text-light"
									: "text-body1 text-lightest",
							)}
						>
							{item.label}
						</Link>
					))}
					<div className="h-px bg-stroke-lightest" />
					<button
						type="button"
						onClick={() => {
							onClose();
							onLogout();
						}}
						className="cursor-pointer py-1 text-left text-body1 text-lightest"
					>
						로그아웃 하기
					</button>
				</nav>
			</div>

			<div
				className={cn(
					"fixed inset-x-0 top-11 bottom-0 z-sidebar-backdrop bg-deemed transition-opacity duration-300",
					isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
				)}
				onClick={onClose}
				aria-hidden="true"
			/>
		</div>
	);
};
