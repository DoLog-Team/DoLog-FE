"use client";

import Image from "next/image";
import { EmptyImageFallback } from "../../EmptyImageFallback/EmptyImageFallback";
import { rowCardStyles as s } from "./RowCard.styles";
import type { RowCardProps } from "./RowCard.types";

export const RowCard = ({ name, engName, email, imageUrl, showImage = true }: RowCardProps) => {
	return (
		<article className={`${s.wrapper} ${!showImage ? "pb-4 border-b border-stroke-lighter" : ""}`}>
			{showImage && (
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
						<EmptyImageFallback className="w-full h-full" />
					)}
				</div>
			)}

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
