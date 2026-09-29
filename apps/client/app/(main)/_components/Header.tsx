"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { track } from "@/lib/amplitude";

export const Header = () => {
	return (
		<DesktopContainer>
			<header className="flex items-center justify-between py-3">
				<Link href="/" aria-label="두록 홈">
					<Image src="/images/logo.svg" alt="DoLog" width={47} height={20} priority />
				</Link>
				<a
					href="https://www.instagram.com/dolog.archive/"
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => track("Button Clicked", { button: "문의하기", page: "main" })}
				>
					<Button variant="assistive" size="sm">
						문의하기
					</Button>
				</a>
			</header>
		</DesktopContainer>
	);
};
