"use client";

import Image from "next/image";
import { useState } from "react";

interface LocationMapProps {
	address: string;
	lat: string;
	lng: string;
}

export function LocationMap({ address, lat, lng }: LocationMapProps) {
	const [isMapFailed, setIsMapFailed] = useState(false);

	const encodedAddress = encodeURIComponent(address);
	const naverMapSearchUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
	const kakaoMapSearchUrl = `https://map.kakao.com/link/search/${encodedAddress}`;
	const handleCopyAddress = () => {
		navigator.clipboard.writeText(address);
		alert("주소가 복사되었습니다.");
	};

	return (
		<div className="flex flex-col w-full mb-2.5">
			{isMapFailed ? (
				<div className="aspect-video flex items-center justify-center text-body2 text-lighter">
					지도를 불러오지 못했습니다
				</div>
			) : (
				// biome-ignore lint/performance/noImgElement: onError로 지도 로드 실패를 감지해야 하므로 img 사용
				// biome-ignore lint/a11y/noNoninteractiveElementInteractions: onError 핸들러가 필요함
				<img
					src={`/api/map-image?lat=${lat}&lng=${lng}`}
					alt={address}
					className="aspect-video w-full object-cover"
					onError={() => setIsMapFailed(true)}
				/>
			)}

			{/* 하단 버튼바 컨테이너 */}
			<div className="min-[721px]:hidden flex items-center p-3 bg-fg-lighter rounded-b-[10px]">
				{/* 네이버 맵 버튼 */}
				<a
					href={naverMapSearchUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex items-center justify-center gap-0.5"
				>
					<Image
						src="/icons/naverMap.png"
						alt="네이버 맵"
						width={20}
						height={20}
						className="object-contain"
					/>
					<span className="px-1.25 text-body2-bold text-lighter">네이버 맵</span>
				</a>

				<div className="w-px h-4 border border-stroke-lighter" />

				{/* 카카오 맵 버튼 */}
				<a
					href={kakaoMapSearchUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex items-center justify-center gap-0.5"
				>
					<Image
						src="/icons/kakaoMap.png"
						alt="카카오 맵"
						width={20}
						height={20}
						className="object-contain"
					/>
					<span className="px-1 text-body2-bold text-lighter">카카오 맵</span>
				</a>

				<div className="w-px h-4 border border-stroke-lighter" />

				{/* 주소 복사 버튼 */}
				<button
					type="button"
					onClick={handleCopyAddress}
					className="flex-1 flex items-center justify-center gap-0.5 cursor-pointer"
				>
					<Image
						src="/icons/link.svg"
						alt="주소 복사"
						width={20}
						height={20}
						className="object-contain"
					/>
					<span className="px-1 text-body2-bold text-lighter">주소 복사</span>
				</button>
			</div>
		</div>
	);
}
