"use client";

import { useSectionTime } from "@/lib/hooks/useSectionTime";

interface Props {
	pageName: string;
	sections: string[];
}

export function SectionTimeTracker({ pageName, sections }: Props) {
	useSectionTime(pageName, sections);
	return null;
}
