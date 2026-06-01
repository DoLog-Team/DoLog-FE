import Image from "next/image";
import Link from "next/link";
import { EmptyImageFallback } from "../../EmptyImageFallback/EmptyImageFallback";
import type { CardProps } from "../Card.types";
import { listCardStyles as s } from "./ListCard.styles";

export const ListCard = ({
	imageUrl,
	title,
	category,
	author,
	href,
}: CardProps & { href?: string }) => {
	const content = (
		<article className={s.wrapper}>
			<div className={s.imageWrapper}>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={`${title} - ${author}`}
						width={0}
						height={0}
						sizes="100vw"
						className={s.image}
						loading="lazy"
					/>
				) : (
					<EmptyImageFallback className="w-full h-full" />
				)}
			</div>
			<div className={s.info}>
				<h3 className={s.title}>{title}</h3>
				<div className={s.detail}>
					<p className={s.author}>{author}</p>
					{category && (
						<>
							{" "}
							· <p className={s.category}>{category}</p>
						</>
					)}
				</div>
			</div>
		</article>
	);

	return href ? <Link href={href}>{content}</Link> : content;
};
