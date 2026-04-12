import { cn } from "components";
import { type ChipVariantsProps, chipVariants } from "./Chip.styles";

interface ChipProps extends ChipVariantsProps {
	label: string;
	selected?: boolean;
	onClick?: () => void;
	className?: string;
}

export const Chip = ({ label, selected, type, onClick, className }: ChipProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(chipVariants({ type: selected ? type : "default" }), className)}
		>
			{label}
		</button>
	);
};
