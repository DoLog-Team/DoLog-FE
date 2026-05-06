"use client";

import { Divider } from "@/components/common/Divider/Divider";
import { Navigator } from "../Navigator";
import { postNavigationStyles as s } from "./PostNavigation.styles";

import type { NavItem, PostNavigationProps } from "./PostNavigation.types";

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
	const navItems: NavItem[] = [
		prevPost && {
			label: "이전 작가",
			artistName: prevPost.title,
			artistId: String(prevPost.id),
			direction: "prev",
		},
		nextPost && {
			label: "다음 작가",
			artistName: nextPost.title,
			artistId: String(nextPost.id),
			direction: "next",
		},
	].filter(Boolean) as NavItem[];

	if (navItems.length === 0) return null;

	return (
		<section>
			<Divider spacing="none" thickness="thin" fullBleed={false} color="lighter" />

			<div className={s.wrapper}>
				{navItems.map((item, idx) => (
					<div key={item.artistId}>
						<Navigator {...item} />

						{idx !== navItems.length - 1 && (
							<Divider spacing="none" thickness="thin" fullBleed={false} />
						)}
					</div>
				))}
			</div>
		</section>
	);
}
