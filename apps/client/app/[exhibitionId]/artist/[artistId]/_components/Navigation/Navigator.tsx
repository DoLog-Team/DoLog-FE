"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { track } from "@/lib/amplitude";
import { navigatorStyles as s } from "./Navigator.styles";
import type { NavItem } from "./PostNavigation/PostNavigation.types";

export function Navigator({ label, artistName, artistId, direction }: NavItem) {
	const params = useParams();

	const exhibitionId = Array.isArray(params.exhibitionId)
		? params.exhibitionId[0]
		: params.exhibitionId;

	const href = `/${exhibitionId}/artist/${artistId}`;

	const iconSrc = direction === "prev" ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg";

	return (
		<Link
			href={href}
			className={s.wrapper}
			onClick={() =>
				track("Artist Navigation Clicked", {
					direction,
					artist_id: artistId,
					artist_name: artistName,
				})
			}
		>
			<span className={s.left}>{artistName}</span>

			<div className={s.right}>
				<span className={s.label}>{label}</span>
				<Image src={iconSrc} alt={direction} width={24} height={24} className={s.icon} />
			</div>
		</Link>
	);
}
