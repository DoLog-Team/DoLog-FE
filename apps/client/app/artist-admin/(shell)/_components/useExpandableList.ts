import { useMemo, useState } from "react";

const DEFAULT_COLLAPSED_COUNT = 4;

/**
 * 목록을 정렬해서 처음엔 N개(기본 4개)만 보여주고, 더보기·접기로 펼치고 접는 훅
 * (나의 작품 · 나의 전시에 공동 사용함)
 * compare 는 렌더마다 바뀌지 않도록 컴포넌트 밖에 선언해서 넘길 것
 */

export const useExpandableList = <T>(
	items: T[],
	compare: (a: T, b: T) => number,
	collapsedCount = DEFAULT_COLLAPSED_COUNT,
) => {
	const [expanded, setExpanded] = useState(false);

	// useMemo: items 나 정렬 기준이 바뀔 때만 다시 정렬하고, 더보기를 누를 때는 이전 결과를 재사용
	const sorted = useMemo(() => [...items].sort(compare), [items, compare]);
	const visibleItems = expanded ? sorted : sorted.slice(0, collapsedCount);

	return {
		visibleItems,
		expanded,
		canToggle: items.length > collapsedCount,
		toggle: () => setExpanded((prev) => !prev),
	};
};
