"use client";

import Image from "next/image";
import { btsCardStyles as s } from "./BTSCard.styles";

interface BTSCardProps {
	title: string;
	author: string;
	imageUrl: string;
}

export const BTSCard = ({ title, author, imageUrl }: BTSCardProps) => {
	return (
		<article className={s.wrapper}>
			{/* 이미지 */}
			<div className={s.imageWrapper}>
				<Image src={imageUrl} alt={title} width={64} height={64} className={s.image} />
			</div>

			{/* 텍스트 영역 */}
			<section className={s.info}>
				<h3 className={s.title}>{title}</h3>
				<p className={s.author}>{author}</p>
			</section>
		</article>
	);
};
