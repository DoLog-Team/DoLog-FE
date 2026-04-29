/**
 * scrollTabBar 컴포넌트에서 반복되는 로직을 분리하기 위한 커스텀 훅입니다.
 *
 * [핵심 반복 로직]
 * 1. 각 섹션를 담을 id 배열 생성
 * 2. 각 섹션에 refs 할당
 * 3. 현재 활성화된 activeTab을 반환
 *
 */

import { useEffect, useMemo, useState } from "react";

// 기본 offset : 44px (헤더높이)
export const useScrollSpy = (tabIds: string[], offset: number = 44) => {
	const [activeTab, setActiveTab] = useState(tabIds[0]);

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
			const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top, behavior: "smooth" });
			setActiveTab(tabId);
		}
	};

	// 경우2 : 스크롤을 화면이 감지하여 활성화탭을 변경
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const matchedId = Object.keys(sectionRefs).find(
							(id) => sectionRefs[id].current === entry.target,
						);
						if (matchedId) setActiveTab(matchedId);
					}
				});
			},
			{ rootMargin: `-${offset + 10}px 0px -70% 0px`, threshold: 0 },
		);

		Object.values(sectionRefs).forEach((ref) => {
			if (ref.current) observer.observe(ref.current);
		});

		return () => observer.disconnect();
	}, [sectionRefs, offset]);

	return { activeTab, handleTabClick, sectionRefs };
};
