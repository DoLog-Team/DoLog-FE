"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";
import type { BtsListItem } from "@/lib/api/bts";
import { Header } from "../../_components/Header";

interface BehindTheSceneClientProps {
	items: BtsListItem[];
}

const COLLAPSE_THRESHOLD = 150;
const EXPAND_THRESHOLD = 20;

export default function BehindTheSceneClient({ items }: BehindTheSceneClientProps) {
	const params = useParams();
	const exhibitionId = Array.isArray(params.exhibitionId)
		? params.exhibitionId[0]
		: params.exhibitionId;

	const [isScrolled, setIsScrolled] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY;
			setIsScrolled((prev) => {
				if (!prev && y > COLLAPSE_THRESHOLD) return true;
				if (prev && y < EXPAND_THRESHOLD) return false;
				return prev;
			});
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const filtered = items.filter(
		(item) =>
			!searchQuery ||
			item.title.includes(searchQuery) ||
			item.artistNames?.some((name) => name.includes(searchQuery)),
	);

	return (
		<div className="flex flex-col min-h-screen">
			<div className="sticky top-0 z-10 bg-normal">
				<Header />

				{/* 스크롤 전에만 보이는 타이틀 + 서브타이틀 */}
				<div
					className={`overflow-hidden transition-all duration-200 mb-3 ${
						isScrolled ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
					}`}
				>
					<DesktopContainer>
						<Title title="Behind The Scene" />
						<p className="text-body2 text-light">작품의 제작 과정을 확인할 수 있습니다.</p>
					</DesktopContainer>
				</div>

				{/* 검색바 */}
				<div className="pb-2">
					<DesktopContainer>
						<SearchBar
							placeholder="제목 혹은 작가명을 검색해요."
							value={searchQuery}
							onChange={setSearchQuery}
						/>
					</DesktopContainer>
				</div>
			</div>

			{/* 카드 목록 */}
			<section className="flex flex-col flex-1 pt-4 pb-6">
				<DesktopContainer>
					{filtered.length > 0 ? (
						<div className="grid grid-cols-1 gap-y-10 w-full min-[721px]:grid-cols-3 min-[721px]:gap-x-5 min-[721px]:gap-y-6">
							{filtered.map((item) => (
								<Link key={item.btsId} href={`/${exhibitionId}/bts/${item.btsId}`}>
									<article className="w-full flex flex-col gap-3 group">
										<div className="relative w-full aspect-video overflow-hidden">
											{item.thumbnail ? (
												<Image
													src={item.thumbnail}
													alt={item.title}
													fill
													className="object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											) : (
												<EmptyImageFallback className="w-full h-full" />
											)}
										</div>
										<div className="flex flex-col gap-1">
											<h3 className="text-head3 text-strong">{item.title}</h3>
											<p className="text-body2 text-light">{item.artistNames?.join(", ") ?? ""}</p>
										</div>
									</article>
								</Link>
							))}
						</div>
					) : (
						<EmptyState searchQuery={searchQuery} message="등록된 Behind The Scene이 없어요." />
					)}
				</DesktopContainer>
			</section>
		</div>
	);
}
