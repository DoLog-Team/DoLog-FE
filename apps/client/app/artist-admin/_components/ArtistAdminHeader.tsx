"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AdminHeaderActions } from "@/components/common/AdminHeaderActions/AdminHeaderActions";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";

export function ArtistAdminHeader() {
	const router = useRouter();

	return (
		<header className="border-b border-stroke-lightest">
			<DesktopContainer className="flex items-center justify-between py-3">
				<button
					type="button"
					onClick={() => router.back()}
					className="flex items-center gap-2"
					aria-label="뒤로가기"
				>
					<Image src="/icons/backBtn.svg" alt="" width={24} height={24} />
					<span className="text-body1-bold text-strong">마이 페이지</span>
				</button>
				<AdminHeaderActions />
			</DesktopContainer>
		</header>
	);
}
