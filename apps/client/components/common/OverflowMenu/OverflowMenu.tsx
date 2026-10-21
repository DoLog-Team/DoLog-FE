"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDismiss } from "@/lib/hooks/useDismiss";
import { type OverflowMenuItem, OverflowMenuList } from "./OverflowMenuList";

export type { OverflowMenuItem };

interface OverflowMenuProps {
	items: OverflowMenuItem[];
	label: string;
}

export function OverflowMenu({ items, label }: OverflowMenuProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const close = useCallback(() => setOpen(false), []);

	useDismiss(ref, open, close);

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
				<OverflowMenuList
					items={items}
					onSelect={close}
					className="absolute top-full right-0 z-10 w-45"
				/>
			)}
		</div>
	);
}
