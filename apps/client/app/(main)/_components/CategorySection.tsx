"use client";

import { buttonVariants } from "components";
import Link from "next/link";
import { useState } from "react";
import type { CardItem } from "@/components/common/Card/Card.types";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { Title } from "@/components/common/Title/Title";
import { track } from "@/lib/amplitude";

interface Props {
	title: string;
	categories: string[];
	artworks: Record<string, CardItem[]>;
	slugMap?: Record<string, string>;
}

export default function CategorySection({ title, categories, artworks, slugMap }: Props) {
	const [selected] = useState(categories[0]);

	return (
		<section className="flex flex-col px-4 pt-6">
			<Title title={title} />

			<div className="mt-4">
				<CardGrid
					items={artworks[selected] ?? []}
					limit={4}
					getHref={
						slugMap
							? (item) => {
									const slug = slugMap[String(item.id)];
									return slug ? `/${slug}/artwork/${item.id}` : "#";
								}
							: undefined
					}
					onItemClick={(item) =>
						track("Artwork Card Clicked", {
							artwork_id: item.id,
							artwork_title: item.title,
							page: "main",
						})
					}
				/>
			</div>

			<Link
				href="/artworks"
				className={buttonVariants({
					variant: "assistive",
					className: "mt-7 mb-6 w-full",
				})}
				onClick={() => track("More Button Clicked", { target: "artworks", page: "main" })}
			>
				더보기
			</Link>
		</section>
	);
}
