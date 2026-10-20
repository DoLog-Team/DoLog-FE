"use client";

import { useEffect, useMemo } from "react";
import { LikeButton } from "@/components/common/LikeButton/LikeButton";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { setArtistProfileLike } from "@/lib/api/artists/artist-detail";

// 전시 작가 상세 하단 탭바 — 좋아요 하트 + 작가 소개 · 작품
// Figma 탭바에는 "전시" 탭도 있지만 이 페이지에 전시 섹션이 없어 뺀다 (사용자 확인)
// 섹션은 서버 컴포넌트라 ref 대신 data-section 으로 찾는다

interface ArtistTabBarProps {
	profileId: string;
	initialLiked: boolean;
	hasArtworks: boolean;
}

export function ArtistTabBar({ profileId, initialLiked, hasArtworks }: ArtistTabBarProps) {
	const tabs = useMemo(() => {
		const base = [{ id: "profile", label: "작가 소개" }];
		if (hasArtworks) base.push({ id: "artworks", label: "작품" });
		return base;
	}, [hasArtworks]);

	// 헤더 높이 모바일 44px, 데스크탑 68px
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(
		tabs.map((tab) => tab.id),
		44,
		68,
	);

	useEffect(() => {
		for (const tab of tabs) {
			sectionRefs[tab.id].current = document.querySelector<HTMLElement>(
				`[data-section="${tab.id}"]`,
			);
		}
	}, [tabs, sectionRefs]);

	return (
		<ScrollTabBar
			tabs={tabs}
			activeTab={activeTab}
			onTabClick={handleTabClick}
			leading={
				<LikeButton
					initialLiked={initialLiked}
					onToggle={(next, visitorId) => setArtistProfileLike(profileId, next, visitorId)}
				/>
			}
		/>
	);
}
