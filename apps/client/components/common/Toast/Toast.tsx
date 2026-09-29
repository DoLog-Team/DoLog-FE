"use client";

import { useEffect } from "react";

interface ToastProps {
	open: boolean;
	message: string;
	// 이 시간(ms)이 지나면 onClose 호출
	duration?: number;
	onClose?: () => void;
}

export const Toast = ({ open, message, duration = 2000, onClose }: ToastProps) => {
	useEffect(() => {
		if (!open || !onClose) return;
		const timer = setTimeout(onClose, duration);
		return () => clearTimeout(timer);
	}, [open, duration, onClose]);

	if (!open) return null;

	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-0 z-toast flex justify-center px-4 py-9">
			<p
				role="status"
				className="w-full rounded-lg bg-strong/80 px-4 py-3 text-center text-body2-bold text-inverse shadow-[0_0_5px_0_rgba(26,30,39,0.1)] min-[721px]:w-auto min-[721px]:min-w-85"
			>
				{message}
			</p>
		</div>
	);
};
