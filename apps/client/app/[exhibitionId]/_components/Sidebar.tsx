"use client";

import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Title } from "@/components/common/Title/Title";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { track } from "@/lib/amplitude";
import { MOCK_BTS_LIST } from "../bts/_mocks/behind-the-scene";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const NAV_ITEMS = [
	{ label: "전시 소개", path: "" },
	{ label: "전체 전시물", path: "/artwork" },
	{ label: "참여한 사람", path: "/artist" },
	{ label: "Behind The Scene", path: "/bts" },
] as const;

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
	const params = useParams();
	const pathname = usePathname();

	const exhibitionId = Array.isArray(params.exhibitionId)
		? params.exhibitionId[0]
		: params.exhibitionId;

	const exhibition = MOCK_EXHIBITION_DATA.find((e) => e.id === exhibitionId);
	const hasBts = MOCK_BTS_LIST.length > 0;
	const baseUrl = `/${exhibitionId}`;

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const isActive = (path: string) => {
		const fullPath = `${baseUrl}${path}`;
		return path === "" ? pathname === fullPath : pathname.startsWith(fullPath);
	};

	const visibleNavItems = NAV_ITEMS.filter((item) => item.label !== "Behind The Scene" || hasBts);

	return (
		<>
			<div
				className={`fixed top-11 left-0 right-0 z-50 transition-all duration-300 ease-in-out overflow-hidden ${
					isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
				} ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
			>
				<div className="bg-normal rounded-b-[20px] px-4 pt-4 pb-5">
					{exhibition && (
						<div className="mb-6">
							<Title title={exhibition.title} size="head2" margin="none" />
						</div>
					)}

					<nav className="flex flex-col gap-4 mb-7">
						{visibleNavItems.map((item) => (
							<Link
								key={item.label}
								href={`${baseUrl}${item.path}`}
								onClick={() => {
									track("GNB Nav Clicked", { label: item.label, from_page: pathname });
									onClose();
								}}
								className={`py-1 cursor-pointer transition-colors ${
									isActive(item.path) ? "text-body1-bold text-light" : "text-body1 text-lightest"
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>
					<Button
						onClick={() => {
							track("GNB Nav Clicked", {
								label: "dolog 홈에서 전시 보기",
								from_page: pathname,
							});
							window.open("/", "noopener,noreferrer");
						}}
						size="sm"
						variant="outline"
						className="w-full cursor-pointer flex gap-1.5"
					>
						<Image src="/images/logo.svg" alt="DoLog" width={40} height={14} />
						홈에서 전시 보기
					</Button>
				</div>
			</div>

			<div
				className={`fixed inset-0 top-11 left-0 right-0 z-49 bg-[#070707]/20 transition-opacity duration-300 ${
					isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
				onClick={onClose}
				aria-hidden="true"
			/>
		</>
	);
};
