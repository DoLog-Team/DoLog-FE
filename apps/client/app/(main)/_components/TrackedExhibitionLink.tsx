"use client";

import Link from "next/link";
import { track } from "@/lib/amplitude";

interface Props {
	href: string;
	exhibitionId: string | number;
	exhibitionTitle?: string;
	children: React.ReactNode;
}

export function TrackedExhibitionLink({ href, exhibitionId, exhibitionTitle, children }: Props) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			onClick={() =>
				track("Exhibition Card Clicked", {
					exhibition_id: exhibitionId,
					exhibition_title: exhibitionTitle,
					page: "main",
				})
			}
		>
			{children}
		</Link>
	);
}
