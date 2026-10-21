"use client";

import { type RefObject, useEffect } from "react";

// 열려 있는 메뉴·팝오버를 바깥 클릭·ESC 로 닫는다
export function useDismiss(
	ref: RefObject<HTMLElement | null>,
	open: boolean,
	onDismiss: () => void,
) {
	useEffect(() => {
		if (!open) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (!ref.current?.contains(event.target as Node)) onDismiss();
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onDismiss();
		};

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [ref, open, onDismiss]);
}
