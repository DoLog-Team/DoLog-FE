import type { Category } from "@/app/(main)/_mocks/artwork";
import { Chip } from "@/components/common/Chip/Chip";

interface FilterProps {
	categories: readonly string[];
	selected: string;
	onSelect: (category: string) => void;
}

export default function Filter({ categories, selected, onSelect }: FilterProps) {
	return (
		<div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide">
			{categories.map((category) => (
				<Chip
					key={category}
					label={category}
					type={category === "전체" ? "custom" : "assistive"}
					selected={selected === category}
					onClick={() => onSelect(category)}
				/>
			))}
		</div>
	);
}
