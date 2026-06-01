"use client";

import { usePathname } from "next/navigation";

const TAB_BAR_ROUTES = ["/artwork", "/artist", "/bts"];

export function TabBarSpacer() {
	const pathname = usePathname();
	const hasTabBar = TAB_BAR_ROUTES.some((route) => pathname.includes(route));

	if (!hasTabBar) return null;
	return <div className="h-11" />;
}
