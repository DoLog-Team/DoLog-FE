import { type RefObject, useEffect, useState } from "react";

const SCROLL_DELTA = 4;

const getScrollY = () =>
	Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);

export const useShowOnScrollUp = (anchorRef: RefObject<HTMLElement | null>) => {
	const [isPinned, setIsPinned] = useState(false);
	const [isScrollingUp, setIsScrollingUp] = useState(false);

	useEffect(() => {
		let lastY = getScrollY();

		const handleScroll = () => {
			const y = getScrollY();
			if (Math.abs(y - lastY) > SCROLL_DELTA) {
				setIsScrollingUp(y < lastY);
				lastY = y;
			}

			const anchor = anchorRef.current;
			const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
			setIsPinned(!!anchor && anchor.getBoundingClientRect().top < headerBottom);
		};

		handleScroll();
		document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
		return () => document.removeEventListener("scroll", handleScroll, { capture: true });
	}, [anchorRef]);

	return { isPinned, isHidden: isPinned && !isScrollingUp };
};
