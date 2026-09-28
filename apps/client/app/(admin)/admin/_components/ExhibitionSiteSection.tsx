"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { CopyIcon } from "@/components/common/icons/CopyIcon";
import { Modal } from "@/components/common/Modal/Modal";
import type { AdminExhibition } from "../_mocks/exhibition";
import { InfoRows, toDotDate } from "./InfoRows";

// 플랜 확인 페이지는 기획 중이라 경로 미정
const PLAN_HREF = "#";

const NOT_PUBLISHED = "게시 전";

// 노션 `전시 활성화를 위한 기본 데이터 리스트` 의 필수값 — 하나라도 없으면 게시 불가
const REQUIRED_FOR_PUBLISH = [
	"title",
	"type",
	"startDate",
	"endDate",
	"description",
	"address",
	"hostName",
	"hostDescription",
] as const satisfies readonly (keyof AdminExhibition)[];

export const SECTION_TITLE_CLASS =
	"px-0.5 pt-4 pb-5 text-head2 text-strong min-[721px]:text-[24px] min-[721px]:leading-9";

// "YYYY-MM-DD" (사용자 시간대 기준)
const toLocalDate = (date: Date) => date.toLocaleDateString("sv-SE");

// 게시 시작일 + 플랜 이용 개월 수
const addMonths = (date: string, months: number) => {
	const [year, month, day] = date.split("-").map(Number);
	return toLocalDate(new Date(year, month - 1 + months, day));
};

export const ExhibitionSiteSection = ({ exhibition }: { exhibition: AdminExhibition }) => {
	const { siteUrl, entryCode, plan } = exhibition;
	const [publishedAt, setPublishedAt] = useState(exhibition.publishedAt);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const isPublished = publishedAt !== null;
	const canPublish = !isPublished && REQUIRED_FOR_PUBLISH.every((key) => exhibition[key]);

	// 게시 API 연결 전이라 화면에서만 게시 처리
	const handlePublish = () => {
		setIsConfirmOpen(false);
		setPublishedAt(toLocalDate(new Date()));
	};

	return (
		<section className="flex flex-col pb-6 min-[721px]:pb-7">
			<h2 className={SECTION_TITLE_CLASS}>전시 사이트 정보</h2>

			<div className="grid gap-5 min-[721px]:grid-cols-8">
				<SitePreviewCard exhibition={exhibition} />

				<div className="flex flex-col min-[721px]:col-span-5">
					<CopyField label="전시 입장 코드" value={entryCode} />
					<CopyField label="전시 주소" value={siteUrl} className="mt-6" />

					<InfoRows
						className="mt-7"
						rows={[
							{
								label: "게시 시작",
								value: publishedAt ? toDotDate(publishedAt) : NOT_PUBLISHED,
							},
							{
								label: "게시 종료",
								value: (
									<span className="flex flex-wrap gap-x-4">
										{publishedAt && plan
											? toDotDate(addMonths(publishedAt, plan.months))
											: NOT_PUBLISHED}
										{plan && (
											<Link href={PLAN_HREF} className="text-lighter underline">
												사용 중인 플랜 확인 →
											</Link>
										)}
									</span>
								),
							},
						]}
					/>

					<Button
						size="lg"
						disabled={!canPublish}
						onClick={() => setIsConfirmOpen(true)}
						className="mt-5 w-30"
					>
						{isPublished ? "게시 완료" : "게시하기"}
					</Button>
				</div>
			</div>

			<Modal
				open={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title="전시를 게시하시겠어요?"
				description="전시를 게시하면 두록 플랫폼에 공개되며, 게시일을 기준으로 사용 기간이 시작돼요."
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsConfirmOpen(false) },
					{ text: "게시하기", variant: "primary", onClick: handlePublish },
				]}
			/>
		</section>
	);
};

const SitePreviewCard = ({ exhibition }: { exhibition: AdminExhibition }) => {
	const { siteName, siteDescription, siteUrl, imageUrl } = exhibition;

	const content = (
		<>
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt=""
					width={391}
					height={220}
					className="aspect-video w-full object-cover"
				/>
			) : (
				<EmptyImageFallback className="aspect-video w-full" />
			)}
			<div className="flex flex-col px-2.5 py-2.5">
				{/* OG 태그는 선택값이라 없으면 줄을 비움 */}
				{siteName && <p className="px-0.5 text-body1-bold text-strong">{siteName}</p>}
				{siteDescription && <p className="px-0.5 text-body2 text-light">{siteDescription}</p>}
				<p className="mt-2.5 truncate px-0.5 text-body3 text-lightest">{siteUrl}</p>
			</div>
		</>
	);

	const className =
		"flex flex-col self-start overflow-hidden rounded-lg border border-stroke-lighter bg-fg-lighter min-[721px]:col-span-3";

	// 사이트 주소가 생긴 뒤에만 새 창으로 열 수 있음
	return siteUrl ? (
		<a href={siteUrl} target="_blank" rel="noreferrer" className={className}>
			{content}
		</a>
	) : (
		<div className={className}>{content}</div>
	);
};

interface CopyFieldProps {
	label: string;
	value: string | null;
	className?: string;
}

const CopyField = ({ label, value, className }: CopyFieldProps) => {
	// 명세: 복사 결과는 브라우저 기본 알림으로 안내
	const handleCopy = async () => {
		if (!value) return;
		try {
			await navigator.clipboard.writeText(value);
			alert("복사를 성공했어요.");
		} catch {
			alert("복사에 실패했어요. 다시 시도해주세요.");
		}
	};

	return (
		<div className={className}>
			<p className="px-0.5 pb-3 text-body2-bold text-strong">{label}</p>
			<div className="flex items-center gap-2 rounded-lg border border-stroke-lighter bg-fg-lighter px-4 py-3">
				<p className="min-w-0 flex-1 truncate text-body1 text-lightest">{value}</p>
				<button
					type="button"
					onClick={handleCopy}
					disabled={!value}
					aria-label={`${label} 복사`}
					className="cursor-pointer text-icon-strong disabled:cursor-not-allowed disabled:text-disable"
				>
					<CopyIcon />
				</button>
			</div>
		</div>
	);
};
