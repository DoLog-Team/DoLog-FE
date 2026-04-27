import type { CardProps } from "../Card.types";
import { listCardStyles as s } from "./ListCard.styles";

export const ListCard = ({ imageUrl, title, category, author }: CardProps) => {
	return (
		<article className={s.wrapper}>
			<div className={s.imageWrapper}>
				<img src={imageUrl} alt={`${title} - ${author}`} className={s.image} loading="lazy" />
			</div>
			<div className={s.info}>
				<h3 className={s.title}>{title}</h3>
				<div className={s.detail}>
					<p className={s.author}>{author}</p>
					{category && <> · <p className={s.category}>{category}</p></>}
				</div>
			</div>
		</article>
	);
};
