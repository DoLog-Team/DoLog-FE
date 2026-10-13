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

// 고정 영역 높이가 상황에 따라 달라지면 숫자 대신 계산 함수를 넘길 수 있음 (v2에서 헤더 높이 변경 사항 있어서 offset을 함수로 받도록 변경)
type Offset = number | (() => number);

const resolveOffset = (offset: Offset, desktopOffset?: number) => {
	if (desktopOffset !== undefined && window.matchMedia("(min-width: 721px)").matches) {
		return desktopOffset;
	}
	return typeof offset === "function" ? offset() : offset;
};

// 기본 offset : 44px (헤더높이)
// desktopOffset : 데스크탑(721px 이상)에서 헤더 높이가 달라질 때 사용할 offset (없으면 offset 그대로 사용)
export const useScrollSpy = (tabIds: string[], offset: Offset = 44, desktopOffset?: number) => {
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
			const top =
				ref.current.getBoundingClientRect().top +
				document.body.scrollTop -
				resolveOffset(offset, desktopOffset);
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

			const currentOffset = resolveOffset(offset, desktopOffset);
			const passed = [...positions]
				.reverse()
				.find((position) => position.top <= currentOffset + 10);
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
	}, [sectionRefs, offset, desktopOffset, tabIds]);

	return { activeTab, handleTabClick, sectionRefs };
};
