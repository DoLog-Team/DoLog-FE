"use client";
import Image from "next/image";
import { rowCardStyles as s } from "./RowCard.styles";
import type { RowCardProps } from "./RowCard.types";

export const RowCard = ({ name, engName, email, imageUrl }: RowCardProps) => {
	return (
		<article className={s.wrapper}>
			<div className={s.imageWrapper}>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={`${name} ${engName}`}
						width={72}
						height={96}
						className={s.image}
						unoptimized
					/>
				) : (
					<div className="w-full h-full bg-fg-lighter flex items-center justify-center">
						<Image src="/icons/empty-image.svg" alt="이미지 없음" width={32} height={32} />
					</div>
				)}
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
