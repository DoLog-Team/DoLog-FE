//알림 + 프로필 아이콘 (공통)

import Image from "next/image";

interface AdminHeaderActionsProps {
	// sm: 20px 고정, md: 모바일 24px · 데스크탑 28px (Figma Navigation)
	size?: "sm" | "md";
	hasNotification?: boolean;
}

export function AdminHeaderActions({ size = "sm", hasNotification }: AdminHeaderActionsProps) {
	const iconClassName = size === "md" ? "size-6 min-[721px]:size-7" : "size-5";

	return (
		<div className="flex items-center gap-4">
			<button type="button" aria-label="알림" className="relative flex">
				<Image src="/icons/bell.svg" alt="" width={28} height={28} className={iconClassName} />
				{hasNotification && (
					<span className="absolute top-[12.5%] right-[12.5%] size-1/6 rounded-full bg-error" />
				)}
			</button>
			<button type="button" aria-label="마이페이지" className="flex">
				<Image src="/icons/profile.svg" alt="" width={28} height={28} className={iconClassName} />
			</button>
		</div>
	);
}
