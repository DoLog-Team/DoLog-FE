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
	emptyIcon,
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
					<div
						className="w-full h-full flex items-center justify-center"
						style={
							emptyIcon
								? { backgroundColor: "color-mix(in srgb, var(--btn-text) 10%, transparent)" }
								: { backgroundColor: "var(--color-fg-lighter)" }
						}
					>
						{emptyIcon ?? (
							<Image src="/icons/empty-image.svg" alt="이미지 없음" width={32} height={32} />
						)}
					</div>
				)}
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
