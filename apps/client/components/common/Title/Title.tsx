import { titleLayoutStyles as s } from "./Title.styles";

interface TitleLayoutProps {
	title: string;
	margin?: "default" | "compact";
	size?: "head1" | "head2";
	className?: string;
}

export const Title = ({ title, margin, size, className }: TitleLayoutProps) => {
	return (
		<section className={s.wrapper({ margin, className })}>
			<h2 className={s.text({ size })}>{title}</h2>
		</section>
	);
};
