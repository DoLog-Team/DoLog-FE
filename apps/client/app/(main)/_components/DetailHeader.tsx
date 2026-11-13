"use client";

import { useRouter } from "next/navigation";
import { Header } from "./Header";

interface DetailHeaderProps {
	title: string;
}

export function DetailHeader({ title }: DetailHeaderProps) {
	const router = useRouter();
	return <Header variant="detail" title={title} onBackClick={() => router.back()} />;
}
