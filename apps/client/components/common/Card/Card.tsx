import Image from "next/image";
import Link from "next/link";
import { cardStyles as s } from "./Card.styles";
import type { CardProps } from "./Card.types";

export const Card = ({
	imageUrl,
	title,
	category,
	author,
	href,
}: CardProps & { href?: string }) => {
	const content = (
		<article className={s.wrapper}>
			<div className={s.imageWrapper}>
				<Image
					src={imageUrl}
					alt={`${title} - ${author}`}
					width={0}
					height={0}
					sizes="100vw"
					className={s.image}
					loading="lazy"
				/>
			</div>
			<div className={s.info}>
				<h3 className={s.title}>{title}</h3>
				<p className={s.category}>{category}</p>
				<p className={s.author}>{author}</p>
			</div>
		</article>
	);

	return href ? <Link href={href}>{content}</Link> : content;
};
