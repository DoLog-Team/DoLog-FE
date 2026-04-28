import Image from "next/image";
import Link from "next/link";
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
				<Image
					src={imageUrl ?? ""}
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
				<div className={s.detail}>
					<p className={s.author}>{author}</p> · <p className={s.category}>{category}</p>
				</div>
			</div>
		</article>
	);

	return href ? <Link href={href}>{content}</Link> : content;
};
