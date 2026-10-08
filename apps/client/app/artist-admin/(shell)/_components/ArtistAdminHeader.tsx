"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeaderAccountActions } from "@/components/common/HeaderAccountActions/HeaderAccountActions";

export function ArtistAdminHeader() {
	const router = useRouter();

	return (
		<header className="w-full shrink-0 border-b border-stroke-lightest bg-normal">
			<div className="mx-auto flex h-11 w-full max-w-285 items-center justify-between px-4 min-[721px]:h-17 min-[721px]:px-8">
				<button
					type="button"
					onClick={() => router.back()}
					className="flex cursor-pointer items-center"
					aria-label="뒤로가기"
				>
					<Image src="/icons/backBtn.svg" alt="" width={24} height={24} />
					<span className="px-0.5 text-body1-bold text-strong">마이 페이지</span>
				</button>
				<HeaderAccountActions account="artist" place="admin" size="md" />
			</div>
		</header>
	);
}
