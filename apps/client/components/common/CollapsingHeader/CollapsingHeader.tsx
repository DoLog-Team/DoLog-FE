"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";

interface CollapsingHeaderProps {
	title: string;
	searchQuery: string;
	onSearchChange: (value: string) => void;
	searchPlaceholder?: string;
	children?: React.ReactNode;
}

const COLLAPSE_THRESHOLD = 150;
const EXPAND_THRESHOLD = 20;

export const CollapsingHeader = ({
	title,
	searchQuery,
	onSearchChange,
	searchPlaceholder,
	children,
}: CollapsingHeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false);

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

	return (
		<div className="sticky top-0 z-10 bg-normal">
			{/* 뒤로가기 + 스크롤 시 compact 타이틀 */}
			<div
				className={`flex items-center gap-3 px-4 py-2.5 border-b ${
					isScrolled ? "border-transparent" : "border-stroke-lightest"
				}`}
			>
				<Link href="/" className="flex items-center justify-center w-6 h-6 shrink-0">
					<Image src="/icons/backBtn.svg" alt="뒤로가기" width={24} height={24} />
				</Link>
				<span
					className={`text-strong transition-opacity duration-200 ${
						isScrolled ? "opacity-100 text-body1-bold" : "opacity-0 text-head2 pointer-events-none"
					}`}
				>
					{title}
				</span>
			</div>

			{/* 큰 타이틀: 스크롤 전에만 보임 */}
			<div
				className={`px-4 overflow-hidden transition-all duration-200 ${
					isScrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
				}`}
			>
				<Title title={title} />
			</div>

			{/* 검색바 + 필터 */}
			<div className="px-4 pb-6 flex flex-col gap-2.5">
				<SearchBar placeholder={searchPlaceholder} value={searchQuery} onChange={onSearchChange} />
				{children && <div className="flex gap-2.5">{children}</div>}
			</div>
		</div>
	);
};
