"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
	variant?: "logo" | "back";
	title?: string;
}

export const Header = ({ variant = "logo", title }: HeaderProps) => {
	const router = useRouter();

	return (
		<header className="flex items-center justify-between px-4 py-3">
			{variant === "back" ? (
				<div className="flex items-center gap-2">
					<button onClick={() => router.back()} aria-label="뒤로가기">
						<Image src="/icons/backBtn.svg" alt="뒤로가기" width={24} height={24} />
					</button>
					{title && <span className="text-title2 text-normal">{title}</span>}
				</div>
			) : (
				<Image src="/images/exhibitionLogo.svg" alt="DoLog" width={34} height={24} priority />
			)}
			{/* TODO : sideBar 열기 */}
			<Image src="/icons/leadingBtn.svg" alt="메뉴" width={24} height={24} />
		</header>
	);
};
