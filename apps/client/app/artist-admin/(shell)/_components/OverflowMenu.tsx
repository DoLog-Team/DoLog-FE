"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface OverflowMenuItem {
	label: string;
	icon: string;
	href?: string;
	onClick?: () => void;
	danger?: boolean;
}

interface OverflowMenuProps {
	items: OverflowMenuItem[];
	label: string;
}

export function OverflowMenu({ items, label }: OverflowMenuProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	// 메뉴 바깥 클릭·ESC 로 닫는다
	useEffect(() => {
		if (!open) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (!ref.current?.contains(event.target as Node)) setOpen(false);
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);

	return (
		<div ref={ref} className="relative shrink-0">
			<button
				type="button"
				aria-label={label}
				aria-expanded={open}
				onClick={() => setOpen((prev) => !prev)}
				className="flex size-7 cursor-pointer items-center justify-center rounded-[4.67px]"
			>
				<Image src="/icons/more.svg" alt="" width={28} height={28} />
			</button>

			{open && (
				<div className="absolute top-full right-0 z-10 flex w-45 flex-col gap-1 rounded-lg border border-stroke-lighter bg-normal p-2 shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
					{items.map((item, index) => {
						const className = cn(
							"flex w-full cursor-pointer items-center gap-3 rounded-sm p-3 text-body1-bold hover:bg-fg-lighter",
							item.danger ? "text-error" : "text-light",
						);
						const content = (
							<>
								<Image src={item.icon} alt="" width={24} height={24} />
								{item.label}
							</>
						);

						return (
							<div key={item.label}>
								{/* 위험 항목은 앞 항목들과 구분선으로 분리 (단독 항목이면 생략) */}
								{item.danger && index > 0 && <div className="mb-1 h-px bg-stroke-lightest" />}
								{item.href ? (
									<Link href={item.href} className={className}>
										{content}
									</Link>
								) : (
									<button
										type="button"
										className={className}
										onClick={() => {
											setOpen(false);
											item.onClick?.();
										}}
									>
										{content}
									</button>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
