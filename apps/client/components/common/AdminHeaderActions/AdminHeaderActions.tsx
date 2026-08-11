//알림 + 프로필 아이콘 (공통)

import Image from "next/image";

export function AdminHeaderActions() {
	return (
		<div className="flex items-center gap-4">
			<button type="button" aria-label="알림">
				<Image src="/icons/bell.svg" alt="" width={20} height={20} />
			</button>
			<button type="button" aria-label="마이페이지">
				<Image src="/icons/profile.svg" alt="" width={20} height={20} />
			</button>
		</div>
	);
}
