import type { Category } from "@/app/(main)/_mocks/artwork";
import { Chip } from "@/components/common/Chip/Chip";

interface FilterProps {
	categories: readonly Category[];
	selected: Category;
	onSelect: (category: Category) => void;
}

export default function Filter({ categories, selected, onSelect }: FilterProps) {
	return (
		<div className="flex items-center mt-2.5 mb-6 gap-2.5 overflow-x-auto scrollbar-hide">
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
