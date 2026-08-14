import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			// 'text-element1' 등 설정 시, font-size에만 관여하도록 정의함.
			"font-size": [
				{
					text: [
						"head1",
						"head2",
						"head3",
						"body1",
						"body1-bold",
						"body2",
						"body2-bold",
						"body3",
						"body3-bold",
						"element1",
						"element2",
						"element3",
					],
				},
			],
			// text의 커스텀 색상 설정 시, text-color에만 관여하도록 정의함.
			"text-color": ["text-btn-text", "text-cta-text"],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs));
}
