import { cn } from "components";
import { titleLayoutStyles as s } from "./Title.styles";

interface TitleLayoutProps {
	title: string;
	margin?: "default" | "compact";
	size?: "head1" | "head2" | "body1-bold" | "body1" | "body2";
	color?: "strong" | "light" | "lighter";
	className?: string;
}

export const Title = ({ title, margin, size, color, className }: TitleLayoutProps) => {
	return (
		<section className={cn(s.wrapper({ margin }), className)}>
			<h2 className={s.text({ size, color })}>{title}</h2>
		</section>
	);
};
