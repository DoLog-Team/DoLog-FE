"use client";

import { useEffect, useRef } from "react";

interface LocationMapProps {
	address: string;
}

export function LocationMap({ address }: LocationMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);

	/***************************************/
	// WIP : 네이버 맵 호출 수정 중
	useEffect(() => {
		const initMap = () => {
			if (!mapRef.current || !window.naver) return;
      console.log(`${address} - 지도 초기화`); // address 의존성 배열 사용 누락 방지 위한 콘솔로그
			const location = new window.naver.maps.LatLng(37.5582, 127.0002);
			const map = new window.naver.maps.Map(mapRef.current, {
				center: location,
				zoom: 16,
			});

			new window.naver.maps.Marker({
				position: location,
				map: map,
			});
		};

		if (window.naver && window.naver.maps) {
			initMap();
		} else {
			const timer = setInterval(() => {
				if (window.naver && window.naver.maps) {
					initMap();
					clearInterval(timer);
				}
			}, 100);
			return () => clearInterval(timer);
		}
	}, [address]);
	/***************************************/

	const encodedAddress = encodeURIComponent(address);
	const naverMapSearchUrl = `https://map.naver.com/v5/search/${encodedAddress}`; // 네이버맵은 플랫폼 자체에서 로그인을 요구함 (업데이트로 필수 사항)
	const kakaoMapSearchUrl = `https://map.kakao.com/link/search/${encodedAddress}`;
	const handleCopyAddress = () => {
		navigator.clipboard.writeText(address);
		alert("주소가 복사되었습니다.");
	};

	return (
		<div className="flex flex-col w-full mb-2.5">
			{/* TODO : 네이버 맵 api 호출 오류 수정 및 키 전달 */}
			{/* 1. NaverMap 컨테이너 */}
			<div ref={mapRef} className="aspect-video border border-black"></div>

			{/* 2. 하단 버튼바 컨테이너 */}
			<div className="flex items-center p-3 bg-fg-lighter rounded-b-[10px]">
				{/* 네이버 맵 버튼 */}
				<a
					href={naverMapSearchUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex items-center justify-center gap-0.5"
				>
					<div className="w-5 h-5 bg-fg-light" />
					<span className="px-1.25 text-body2-bold text-lighter">네이버 맵</span>
				</a>

				<div className="w-[1px] h-4 border border-stroke-lighter" />

				{/* 카카오 맵 버튼 */}
				<a
					href={kakaoMapSearchUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex items-center justify-center gap-0.5"
				>
					<div className="w-5 h-5 bg-fg-light" />
					<span className="px-1 text-body2-bold text-lighter">카카오 맵</span>
				</a>

				<div className="w-[1px] h-4 border border-stroke-lighter" />

				{/* 주소 복사 버튼 */}
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
