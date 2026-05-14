import { cn } from "components";
import { titleStyles } from "./Title.styles";

interface TitleLayoutProps {
	title: string;
	margin?: "default" | "compact" | "none";
	size?: "head1" | "head2" | "body1-bold" | "body1" | "body2";
	color?: "strong" | "light" | "lighter";
	className?: string;
}

export const Title = ({ title, margin, size, color, className }: TitleLayoutProps) => {
	return <h2 className={cn(titleStyles({ margin, size, color }), className)}>{title}</h2>;
};
