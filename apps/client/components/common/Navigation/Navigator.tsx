"use client";

import Link from "next/link";
import Image from "next/image";
import { navigatorStyles as s } from "./Navigator.styles";
import type { NavItem } from "./PostNavigation/PostNavigation.types";

export function Navigator({ label, artistName, artistId, direction }: NavItem) {
	const iconSrc = direction === "prev" ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg";

	return (
		<Link href={`/artist/${artistId}`} className={s.wrapper}>
			{/* 왼쪽 */}
			<span className={s.left}>{artistName}</span>

			{/* 오른쪽 */}
			<div className={s.right}>
				<span className={s.label}>{label}</span>

				<Image src={iconSrc} alt={direction} width={24} height={24} className={s.icon} />
			</div>
		</Link>
	);
}
