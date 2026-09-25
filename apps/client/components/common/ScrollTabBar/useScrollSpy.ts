/**
 * scrollTabBar 컴포넌트에서 반복되는 로직을 분리하기 위한 커스텀 훅입니다.
 *
 * [핵심 반복 로직]
 * 1. 각 섹션를 담을 id 배열 생성
 * 2. 각 섹션에 refs 할당
 * 3. 현재 활성화된 activeTab을 반환
 *
 */

import { useEffect, useMemo, useRef, useState } from "react";

// 기본 offset : 44px (헤더높이)
export const useScrollSpy = (tabIds: string[], offset: number = 44) => {
	const [activeTab, setActiveTab] = useState(tabIds[0]);
	const isScrollingByClick = useRef(false);
	const SCROLL_LOCK_DURATION_MS = 1000;

	// 1. 각 섹션(tabId)에 대응하는 객체 배열 생성
	// 2. 각 객체에 refs를 담음 (할당)
	// tabIds가 바뀔 때만 refs를 재생성하도록 useMemo 활용
	const sectionRefs = useMemo(() => {
		return tabIds.reduce(
			(acc, id) => {
				acc[id] = { current: null };
				return acc;
			},
			{} as Record<string, React.RefObject<HTMLElement | null>>,
		);
	}, [tabIds]);

	// 경우1 : 탭을 클릭하여 해당 섹션으로 이동
	const handleTabClick = (tabId: string) => {
		const ref = sectionRefs[tabId];
		if (ref?.current) {
			const top = ref.current.getBoundingClientRect().top + document.body.scrollTop - offset;
			isScrollingByClick.current = true;
			document.body.scrollTo({ top, behavior: "smooth" });
			setActiveTab(tabId);
			setTimeout(() => {
				isScrollingByClick.current = false;
			}, SCROLL_LOCK_DURATION_MS);
		}
	};

	// 경우2 : 스크롤을 화면이 감지하여 활성화탭을 변경
	useEffect(() => {
		const computeActiveTab = () => {
			if (isScrollingByClick.current) return;

			const positions = tabIds
				.map((id) => {
					const top = sectionRefs[id].current?.getBoundingClientRect().top;
					return top === undefined ? null : { id, top };
				})
				.filter((position): position is { id: string; top: number } => position !== null);

			if (positions.length === 0) return;

			// 마지막 섹션 뒤에 남은 콘텐츠가 짧으면, 끝까지 스크롤해도 그 섹션의 top이
			// offset 라인까지 못 올라올 수 있음 -> 스크롤 최대치에 도달하면 마지막 섹션을 강제로 활성화함
			const isAtBottom =
				document.body.scrollTop + document.body.clientHeight >= document.body.scrollHeight - 2;
			if (isAtBottom) {
				setActiveTab(positions[positions.length - 1].id);
				return;
			}

			const passed = [...positions].reverse().find((position) => position.top <= offset + 10);
			const nextActiveTab = passed?.id ?? positions[0].id;
			setActiveTab(nextActiveTab);
		};

		let ticking = false;
		const handleScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				computeActiveTab();
				ticking = false;
			});
		};

		computeActiveTab();
		document.body.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			document.body.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [sectionRefs, offset, tabIds]);

	return { activeTab, handleTabClick, sectionRefs };
};
