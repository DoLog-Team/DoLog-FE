"use client";

import { useEffect, useRef } from "react";
import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";
import { LocationMap } from "./LocationMap";

interface ExhibitionLocationProps {
	location: Exhibition["location"];
}

export function ExhibitionLocation({ location }: ExhibitionLocationProps) {
	const mapRef = useRef<HTMLDivElement>(null);

	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="장소" />
			<LocationMap
				address={location.address}
				naverMapUrl={location.naverMapUrl}
				kakaoMapUrl={location.kakaoMapUrl}
			/>

			{/* 주소 텍스트 */}
			<p className="text-body1">{location.address}</p>
			{location.detail && <p className="text-body1">{location.detail}</p>}
		</section>
	);
}
