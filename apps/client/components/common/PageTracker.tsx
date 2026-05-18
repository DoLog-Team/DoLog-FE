"use client";

import { useDwellTime } from "@/lib/hooks/useDwellTime";
import { useScrollDepth } from "@/lib/hooks/useScrollDepth";

interface Props {
	pageName: string;
}

export function PageTracker({ pageName }: Props) {
	useDwellTime(pageName);
	useScrollDepth(pageName);
	return null;
}
