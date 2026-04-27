"use client";
import Image from "next/image";
import { rowCardStyles as s } from "./RowCard.styles";
import type { RowCardProps } from "./RowCard.types";

export const RowCard = ({ name, engName, email, imageUrl }: RowCardProps) => {
	return (
		<article className={s.wrapper}>
			{/* 이미지 -  TODO: default 이미지 임시로 넣어둠*/}
			<div className={s.imageWrapper}>
				<Image
					src={imageUrl ?? "/images/artists/artist2.png"}
					alt={`${name} ${engName}`}
					width={72}
					height={96}
					className={s.image}
				/>
			</div>

			{/* 텍스트 */}
			<section className={s.info}>
				<div className={s.nameRow}>
					<h3 className={s.nameKr}>{name}</h3>
					<p className={s.nameEn}>{engName}</p>
				</div>

				<p className={s.email}>{email}</p>
			</section>
		</article>
	);
};
