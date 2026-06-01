"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { track } from "@/lib/amplitude";
import type { BannerItem } from "@/lib/api/exhibition";

const MAX_BANNERS = 20;

export default function Banner({ banners }: { banners: BannerItem[] }) {
	const slicedBanners = banners.slice(0, MAX_BANNERS);
	const [current, setCurrent] = useState(0);
	const touchStartX = useRef(0);
	const mouseStartX = useRef(0);
	const wheelLocked = useRef(false);

	const isMultiple = slicedBanners.length > 1;
	const prev = () => setCurrent((c) => Math.max(0, c - 1));
	const next = () => setCurrent((c) => Math.min(slicedBanners.length - 1, c + 1));

	return (
		<section aria-label="배너 슬라이드" className="flex flex-col overflow-hidden">
			{/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: carousel swipe */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: carousel swipe */}
			<div
				className="relative w-full overflow-hidden"
				onTouchStart={(e) => {
					touchStartX.current = e.touches[0].clientX;
				}}
				onTouchEnd={(e) => {
					if (!isMultiple) return;
					const diff = touchStartX.current - e.changedTouches[0].clientX;
					if (diff > 50) next();
					if (diff < -50) prev();
				}}
				onMouseDown={(e) => {
					mouseStartX.current = e.clientX;
				}}
				onMouseUp={(e) => {
					if (!isMultiple) return;
					const diff = mouseStartX.current - e.clientX;
					if (diff > 50) next();
					if (diff < -50) prev();
				}}
				onWheel={(e) => {
					if (!isMultiple || wheelLocked.current) return;
					if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
					if (e.deltaX > 30) {
						next();
						wheelLocked.current = true;
					} else if (e.deltaX < -30) {
						prev();
						wheelLocked.current = true;
					}
					if (wheelLocked.current)
						setTimeout(() => {
							wheelLocked.current = false;
						}, 500);
				}}
			>
				{/* 데스크탑 블러 배경 */}
				{slicedBanners[current]?.imageUrl && (
					<div className="absolute inset-0 hidden min-[721px]:block overflow-hidden" aria-hidden>
						<Image
							src={slicedBanners[current].imageUrl}
							alt=""
							fill
							className="object-cover scale-110"
							style={{ filter: "blur(20px)" }}
						/>
						<div className="absolute inset-0" style={{ background: "rgba(0, 0, 0, 0.40)" }} />
					</div>
				)}

				{/* 실제 배너 슬라이더 */}
				<div className="relative min-[721px]:max-w-285 min-[721px]:mx-auto aspect-3/1">
					<div
						className="flex h-full transition-transform duration-300 ease-in-out select-none"
						style={{ transform: `translateX(-${current * 100}%)` }}
					>
						{slicedBanners.map((banner, i) => (
							<Link
								key={banner.id}
								href={banner.linkUrl}
								className="relative min-w-full h-full block"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() =>
									track("Banner Clicked", {
										banner_id: banner.id,
										banner_index: banner.orderIndex,
										banner_url: banner.linkUrl,
										position: i,
									})
								}
							>
								{banner.imageUrl && (
									<Image
										src={banner.imageUrl}
										alt={`배너 ${banner.orderIndex}번 이미지`}
										fill
										draggable={false}
										sizes="(max-width: 540px) 100vw, 1060px"
										className="object-cover"
										priority={i === 0}
									/>
								)}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* dots */}
			{isMultiple && (
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
			)}
		</section>
	);
}
