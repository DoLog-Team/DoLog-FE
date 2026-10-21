"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useDismiss } from "@/lib/hooks/useDismiss";
import { cn } from "@/lib/utils/cn";

const BUTTON_CLASS =
	"flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-fg-inverse shadow-[0_0_20px_rgba(0,0,0,0.2)]";

function FabIcon({ icon }: { icon: "edit" | "close" }) {
	return (
		<span
			className={cn(
				"size-7 bg-icon-inverse mask-size-[100%] mask-no-repeat",
				icon === "edit" ? "mask-[url(/icons/edit.svg)]" : "mask-[url(/icons/close.svg)]",
			)}
		/>
	);
}

type EditFabProps = { label: string } & (
	| { href: string; menu?: never }
	// 누르면 위로 메뉴가 열리고 연필이 닫기 아이콘으로 바뀐다 — close 로 메뉴를 닫는다
	| { href?: never; menu: (close: () => void) => React.ReactNode }
);

/**
 * 작가 본인 전용 연필 버튼 (피그마 "수정 버튼") — 작가 상세·작품 상세 공통
 * 하단 탭바(46px) 위 오른쪽에 고정, 모바일 16px · 데스크탑 32px 띄움
 * href 면 바로 이동, menu 면 작품 관리 메뉴처럼 메뉴를 연다
 */
export function EditFab({ label, href, menu }: EditFabProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const close = useCallback(() => setOpen(false), []);

	useDismiss(ref, open, close);

	return (
		<div
			ref={ref}
			className="fixed right-4 bottom-[62px] z-30 min-[721px]:right-8 min-[721px]:bottom-[78px]"
		>
			{href ? (
				<Link href={href} aria-label={label} className={BUTTON_CLASS}>
					<FabIcon icon="edit" />
				</Link>
			) : (
				<>
					{open && <div className="absolute right-0 bottom-[60px] w-50">{menu?.(close)}</div>}
					<button
						type="button"
						aria-label={open ? "닫기" : label}
						aria-expanded={open}
						onClick={() => setOpen((prev) => !prev)}
						className={BUTTON_CLASS}
					>
						<FabIcon icon={open ? "close" : "edit"} />
					</button>
				</>
			)}
		</div>
	);
}
