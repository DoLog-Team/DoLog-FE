import { dividerStyles as s } from "./Divider.styles";

interface DividerProps {
	spacing?: "none" | "sm" | "md" | "lg";
	thickness?: "thin" | "medium" | "thick";
	fullBleed?: boolean;
	color?: "lightest" | "lighter";
}

export const Divider = ({ spacing, thickness, fullBleed, color }: DividerProps) => {
	return (
		<div className={s.wrapper({ spacing, fullBleed })}>
			<div className={s.line({ thickness, color })} />
		</div>
	);
};
