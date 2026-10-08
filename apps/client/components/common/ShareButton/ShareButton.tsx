"use client";

import Image from "next/image";

export function ShareButton() {
	const handleShare = async () => {
		const url = window.location.href;

		// 기본 공유 모달을 지원하지 않는 브라우저는 링크 복사로 대체
		if (!navigator.share) {
			await navigator.clipboard.writeText(url);
			alert("URL이 복사되었습니다.");
			return;
		}

		try {
			await navigator.share({ title: document.title, url });
		} catch {}
	};

	return (
		<button type="button" onClick={handleShare} aria-label="공유하기" className="cursor-pointer">
			<Image
				src="/icons/share.svg"
				alt=""
				width={24}
				height={24}
				className="size-6 min-[721px]:size-7"
			/>
		</button>
	);
}
