import { cardStyles as s } from "./Card.styles";

export interface CardProps {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  author: string;
}

export const Card = ({ imageUrl, title, category, author }: CardProps) => {
  return (
    <article className={s.wrapper}>
      <div className={s.imageWrapper}>
        <img
          src={imageUrl}
          alt={`${title} - ${author}`}
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
};
