"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export interface BannerItem {
	id: number;
	imageUrl: string;
	orderIndex: number;
	linkUrl: string;
}

const MAX_BANNERS = 20;

export default function Banner({ banners }: { banners: BannerItem[] }) {
	const slicedBanners = banners.slice(0, MAX_BANNERS);
	const [current, setCurrent] = useState(0);
	const touchStartX = useRef(0);
	const mouseStartX = useRef(0);

	const prev = () => setCurrent((c) => Math.max(0, c - 1));
	const next = () => setCurrent((c) => Math.min(slicedBanners.length - 1, c + 1));

	return (
		<div className="flex flex-col overflow-hidden">
			{/* slide */}
			<div
				role="region"
				aria-label="배너 슬라이드"
				className="relative w-full aspect-3/1 overflow-hidden"
				onTouchStart={(e) => {
					touchStartX.current = e.touches[0].clientX;
				}}
				onTouchEnd={(e) => {
					const diff = touchStartX.current - e.changedTouches[0].clientX;
					if (diff > 50) next();
					if (diff < -50) prev();
				}}
				onMouseDown={(e) => {
					mouseStartX.current = e.clientX;
				}}
				onMouseUp={(e) => {
					const diff = mouseStartX.current - e.clientX;
					if (diff > 50) next();
					if (diff < -50) prev();
				}}
			>
				<div
					className="flex h-full transition-transform duration-300 ease-in-out"
					style={{ transform: `translateX(-${current * 100}%)` }}
				>
					{slicedBanners.map((banner, i) => (
						<Link
							key={banner.id}
							href={banner.linkUrl}
							className="relative min-w-full h-full block"
						>
							<Image
								src={banner.imageUrl}
								alt=""
								fill
								sizes="(max-width: 540px) 100vw, 540px"
								className="object-cover"
								priority={i === 0}
							/>
						</Link>
					))}
				</div>
			</div>

			{/* dots */}
			<div className="flex justify-center items-center gap-2 py-2.5">
				{slicedBanners.map((banner, i) => (
					<button
						key={banner.id}
						type="button"
						onClick={() => setCurrent(i)}
						className={`w-1.25 h-1.25 rounded-full transition-colors cursor-pointer ${
							i === current ? "bg-fg-inverse" : "bg-fg-light"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
