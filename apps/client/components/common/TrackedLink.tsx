"use client";

import Link from "next/link";
import { track } from "@/lib/amplitude";

interface Props {
	href: string;
	eventName: string;
	eventProps?: Record<string, unknown> | (() => Record<string, unknown>);
	className?: string;
	children: React.ReactNode;
	target?: string;
	rel?: string;
}

export function TrackedLink({
	href,
	eventName,
	eventProps,
	className,
	children,
	target,
	rel,
}: Props) {
	return (
		<Link
			href={href}
			className={className}
			target={target}
			rel={rel}
			onClick={() => track(eventName, typeof eventProps === "function" ? eventProps() : eventProps)}
		>
			{children}
		</Link>
	);
}
