import { createRef, useEffect, useRef, useState } from "react";

export function useBottomTabBar(labels: string[]) {
	const refs = useRef(labels.map(() => createRef<HTMLDivElement | null>()));
	const [activeIndex, setActiveIndex] = useState(0);

	// 탭바 선택 시 label에 따라 ref를 초기화시킴
	if (refs.current.length !== labels.length) {
		refs.current = labels.map(() => createRef<HTMLDivElement | null>());
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = refs.current.findIndex((ref) => ref.current === entry.target);
						if (index !== -1) setActiveIndex(index);
					}
				});
			},
			{ threshold: 0, rootMargin: "0px 0px -50% 0px" },
		);

		refs.current.forEach((ref) => {
			if (ref.current) observer.observe(ref.current);
		});

		return () => observer.disconnect();
	}, []);

	const tabs = labels.map((label, index) => ({
		label,
		ref: refs.current[index],
		onTabClick: () => setActiveIndex(index),
	}));

	return { tabs, activeIndex, refs: refs.current };
}
