import { titleLayoutStyles as s } from "./Title.styles";

interface TitleLayoutProps {
  title: string;
  margin?: "default" | "compact";
  className?: string;
}

export const Title = ({
  title,

  margin,
  className,
}: TitleLayoutProps) => {
  return (
    <section className={s.wrapper({ margin, className })}>
      <h2 className={s.text}>{title}</h2>
    </section>
  );
};
