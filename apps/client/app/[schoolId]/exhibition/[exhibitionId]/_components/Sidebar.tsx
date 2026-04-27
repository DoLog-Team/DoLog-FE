"use client";

import { Button } from "components";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Title } from "@/components/common/Title/Title";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { MOCK_BEHIND_THE_SCENE } from "../bts/_mocks/behind-the-scene";

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

	const schoolId = Array.isArray(params.schoolId) ? params.schoolId[0] : params.schoolId;
	const exhibitionId = Array.isArray(params.exhibitionId)
		? params.exhibitionId[0]
		: params.exhibitionId;

	const exhibition = MOCK_EXHIBITION_DATA.find((e) => e.id === exhibitionId);
	const hasBts = MOCK_BEHIND_THE_SCENE.length > 0;
	const baseUrl = `/${schoolId}/exhibition/${exhibitionId}`;

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
				className={`fixed top-11 left-0 right-0 mx-auto w-full max-w-135 z-50 transition-all duration-300 ease-in-out overflow-hidden ${
					isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
				} ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
			>
				<div className="relative w-full bg-[#070707]/20 backdrop-blur-md rounded-b-[20px] pb-6">
					<div className="bg-normal rounded-b-[20px] px-5 py-6 shadow-lg">
						{exhibition && (
							<div className="mb-6">
								<Title title={exhibition.title} size="head2" />
							</div>
						)}

						<nav className="flex flex-col gap-4 mb-7">
							{visibleNavItems.map((item) => (
								<Link
									key={item.label}
									href={`${baseUrl}${item.path}`}
									onClick={onClose}
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
								window.open("/", "_blank", "noopener,noreferrer");
								onClose();
							}}
							size="sm"
							variant="main"
							className="w-full cursor-pointer"
						>
							dolog 홈에서 전시 보기
						</Button>
					</div>
				</div>
			</div>

			<div
				className={`fixed inset-0 top-11 left-0 right-0 mx-auto z-49 bg-black/40 transition-opacity duration-300 max-w-135 ${
					isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
				onClick={onClose}
				aria-hidden="true"
			/>
		</>
	);
};
