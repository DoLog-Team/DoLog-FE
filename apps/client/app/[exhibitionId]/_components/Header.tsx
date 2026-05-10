"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useExhibition } from "../_context/ExhibitionContext";
import { Sidebar } from "./Sidebar";

interface HeaderProps {
	variant?: "logo" | "back";
	title?: string;
	onBackClick?: () => void;
	onMenuClick?: () => void;
}

export const Header = ({ variant = "logo", title }: HeaderProps) => {
	const router = useRouter();
	const { slug, logoImg } = useExhibition();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const baseUrl = `/${slug}`;

	return (
		<>
			<header className="sticky top-0 z-51 flex items-center justify-between px-4 py-3 h-11 border-b border-stroke-lightest bg-normal">
				{variant === "back" ? (
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => router.back()}
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
								className="h-16 w-auto"
								priority
							/>
						) : (
							<Image src="/images/exhibitionLogo.svg" alt="DoLog" width={34} height={24} priority />
						)}
						{/* TODO : 기본 로고 fallback 제거 예정 */}
					</button>
				)}
				<button
					type="button"
					onClick={() => setIsSidebarOpen((prev) => !prev)}
					className="cursor-pointer"
					aria-label={isSidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
				>
					{isSidebarOpen ? (
						<Image src="/icons/close.svg" alt="닫기" width={24} height={24} />
					) : (
						<Image src="/icons/leadingBtn.svg" alt="메뉴" width={24} height={24} />
					)}
				</button>
			</header>
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
		</>
	);
};
