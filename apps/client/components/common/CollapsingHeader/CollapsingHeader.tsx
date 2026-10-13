"use client";

import { useEffect, useState } from "react";
import { Header } from "@/app/(main)/_components/Header";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";
import { cn } from "@/lib/utils/cn";

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
			{/* 두록 상세 헤더 — 큰 제목이 접히면 헤더에 제목 표시 */}
			<Header
				variant="detail"
				title={title}
				showTitle={isScrolled}
				className={cn(
					"border-b min-[721px]:border-b-0",
					isScrolled ? "border-transparent" : "border-stroke-lightest",
				)}
			/>
			<DesktopContainer>
				{/* 큰 타이틀: 스크롤 전에만 보임 */}
				<div
					className={`overflow-hidden transition-all duration-200 ${
						isScrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
					}`}
				>
					<Title title={title} />
				</div>

				{/* 검색바 + 필터 */}
				<div className="pb-6 flex flex-col gap-2.5">
					<SearchBar
						placeholder={searchPlaceholder}
						value={searchQuery}
						onChange={onSearchChange}
					/>
					{children && <div className="flex gap-2.5">{children}</div>}
				</div>
			</DesktopContainer>
		</div>
	);
};
