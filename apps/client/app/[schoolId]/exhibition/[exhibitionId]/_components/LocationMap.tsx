"use client";

import { useEffect, useRef } from "react";

interface LocationMapProps {
	address: string;
	naverMapUrl?: string;
	kakaoMapUrl?: string;
}

export function LocationMap({ address }: LocationMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);

	const encodedAddress = encodeURIComponent(address);
	const naverMapSearchUrl = `https://map.naver.com/v5/search/${encodedAddress}`; // 네이버맵은 플랫폼 자체에서 로그인을 요구함 (업데이트로 필수 사항)
	const kakaoMapSearchUrl = `https://map.kakao.com/link/search/${encodedAddress}`;
	const handleCopyAddress = () => {
		navigator.clipboard.writeText(address);
		alert("주소가 복사되었습니다.");
	};

	return (
		<div className="flex flex-col w-full mb-2.5">
			{/* 1. NaverMap 컨테이너 */}
			<div className="aspect-video bg-fg-light">NaverMap 띄우기</div>

			{/* 2. 하단 버튼바 컨테이너 */}
			<div className="flex items-center p-3 bg-fg-lighter rounded-b-[10px]">
				{/* 네이버 맵 Url */}
				<a
					href={naverMapSearchUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex items-center justify-center gap-0.5"
				>
					<div className="w-5 h-5 bg-fg-light" />
					<span className="px-1.25 text-body2-bold text-lighter">네이버 맵</span>
				</a>

				{/* 구분선 */}
				<div className="w-[1px] h-4 border border-stroke-lighter" />

				{/* 카카오 맵 Url */}
				<a
					href={kakaoMapSearchUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex items-center justify-center gap-0.5"
				>
					<div className="w-5 h-5 bg-fg-light" />
					<span className="px-1 text-body2-bold text-lighter">카카오 맵</span>
				</a>

				{/* 구분선 */}
				<div className="w-[1px] h-4 border border-stroke-lighter" />

				{/* 주소 복사 */}
				<button
					onClick={handleCopyAddress}
					className="flex-1 flex items-center justify-center gap-0.5"
				>
					<div className="w-5 h-5 bg-fg-light" />
					<span className="px-1 text-body2-bold text-lighter">주소 복사</span>
				</button>
			</div>
		</div>
	);
}
