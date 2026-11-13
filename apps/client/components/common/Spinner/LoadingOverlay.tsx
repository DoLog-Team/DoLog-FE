"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Spinner } from "./Spinner";

interface LoadingOverlayProps {
	open: boolean;
}

// 이보다 빨리 끝나는 처리는 딤드를 띄우지 않는다 — 짧게 어두워졌다 밝아지는 깜빡임을 막는다
const SHOW_DELAY_MS = 300;

// 페이지 안에서 기다려야 하는 동작 중에 화면 전체에 딤드를 깔고 스피너를 띄운다
// - 페이지 전환 로딩은 각 구간의 loading.tsx 가 맡는다
// - 저장 버튼처럼 누른 버튼 자리에 점 로딩(DotsLoader)이 있는 동작에는 쓰지 않는다
// 모달 버튼으로 시작한 동작도 덮도록 모달보다 위에 body 로 띄우고, 그동안 화면 조작을 막는다
export function LoadingOverlay({ open }: LoadingOverlayProps) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!open) {
			setVisible(false);
			return;
		}
		const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
		return () => clearTimeout(timer);
	}, [open]);

	// createPortal 은 브라우저에서만 쓸 수 있는데, visible 은 마운트 후 effect 에서만 true 가 된다
	if (!visible) return null;

	return createPortal(
		<div
			role="status"
			aria-live="polite"
			aria-label="처리 중"
			className="fixed inset-0 z-(--z-index-toast) flex items-center justify-center bg-deemed"
		>
			<Spinner />
		</div>,
		document.body,
	);
}
