import { cn } from "@/lib/utils/cn";
import { dividerStyles as s } from "./Divider.styles";

interface DividerProps {
	spacing?: "none" | "sm" | "md" | "lg";
	thickness?: "thin" | "medium" | "thick";
	fullBleed?: boolean;
	color?: "lightest" | "lighter";
	className?: string;
}

export const Divider = ({ spacing, thickness, fullBleed, color, className }: DividerProps) => {
	return (
		<div className={cn(s.wrapper({ spacing, fullBleed }), className)}>
			<div className={s.line({ thickness, color })} />
		</div>
	);
};
