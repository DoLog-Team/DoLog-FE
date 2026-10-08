"use client";

import { josa } from "es-hangul";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { Modal } from "@/components/common/Modal/Modal";
import { Select } from "@/components/common/Select/Select";
import type { MyArtwork } from "../_mocks/artworks";
import { MOCK_MY_EXHIBITIONS } from "../_mocks/exhibitions";
import { Engagement } from "./Engagement";
import { OverflowMenu, type OverflowMenuItem } from "./OverflowMenu";
import { ArtworkStatusBadge, StatusBadge } from "./StatusBadge";

interface MyArtworkCardProps {
	artwork: MyArtwork;
	onDelete: (artworkId: string) => void;
}

/**
 * 작품 카드 컴포넌트
 */
export function MyArtworkCard({ artwork, onDelete }: MyArtworkCardProps) {
	const router = useRouter();
	const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
	const [selectedExhibitionId, setSelectedExhibitionId] = useState<string | undefined>(undefined);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	// 수락 완료된 전시만 출품 대상으로 선택 가능
	const acceptedExhibitions = MOCK_MY_EXHIBITIONS.filter((exhibition) => exhibition.acceptedAt);

	const handleSubmit = () => {
		if (!selectedExhibitionId) return;
		setIsSubmitModalOpen(false);
		router.push(`/artist-admin/artworks/${artwork.artworkId}/exhibition`);
	};

	const handleDelete = () => {
		setIsDeleteModalOpen(false);
		onDelete(artwork.artworkId);
	};

	const menuItems: OverflowMenuItem[] = [
		{
			label: "편집하기",
			icon: "/icons/edit.svg",
			href: `/artist-admin/artworks/${artwork.artworkId}/edit`,
		},
		artwork.exhibition
			? {
					label: "출품 정보 편집",
					icon: "/icons/edit.svg",
					href: `/artist-admin/artworks/${artwork.artworkId}/exhibition`,
				}
			: {
					label: "작품 출품하기",
					icon: "/icons/link.svg",
					onClick: () => {
						setSelectedExhibitionId(undefined);
						setIsSubmitModalOpen(true);
					},
				},
		{
			label: "삭제하기",
			icon: "/icons/trash.svg",
			danger: true,
			onClick: () => setIsDeleteModalOpen(true),
		},
	];

	return (
		<article className="flex gap-4 min-[721px]:flex-col min-[721px]:gap-3">
			<div className="relative h-32.5 w-23 shrink-0 bg-normal min-[721px]:aspect-[254/359] min-[721px]:h-auto min-[721px]:w-full">
				{artwork.image ? (
					<Image
						src={artwork.image}
						alt={artwork.title}
						fill
						sizes="(min-width: 721px) 254px, 92px"
						className="object-contain"
					/>
				) : (
					<EmptyImageFallback className="size-full" />
				)}
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex items-start gap-2">
					<div className="flex min-w-0 flex-1 flex-col gap-0.5 min-[721px]:gap-2.5">
						<h3 className="order-2 truncate px-0.5 text-body1-bold text-strong min-[721px]:order-1 min-[721px]:text-head3">
							{artwork.title}
						</h3>
						<p className="order-1 flex gap-2.5 px-0.5 text-body2-bold min-[721px]:order-2">
							<span className="text-light">{artwork.exhibition?.name ?? "개인 작품"}</span>
							{artwork.exhibition?.hidden && <span className="text-error">전시 내 숨김 처리</span>}
						</p>
					</div>
					<OverflowMenu label={`${artwork.title} 더보기`} items={menuItems} />
				</div>

				<div className="mt-2.5">
					<Engagement viewCount={artwork.viewCount} likeCount={artwork.likeCount} />
				</div>

				<div className="mt-3 flex gap-1.5">
					<ArtworkStatusBadge status={artwork.status} />
					{artwork.status === "draft" && <StatusBadge label={`${artwork.completionRate}% 작성`} />}
				</div>
			</div>

			<Modal
				open={isSubmitModalOpen}
				onOpenChange={setIsSubmitModalOpen}
				title="전시 선택"
				description={`${josa(artwork.title, "을/를")} 출품할 전시를 선택해주세요.`}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsSubmitModalOpen(false) },
					{
						text: "제출하기",
						variant: "primary",
						disabled: !selectedExhibitionId,
						onClick: handleSubmit,
					},
				]}
			>
				<Select
					options={acceptedExhibitions.map((exhibition) => ({
						label: exhibition.name,
						value: exhibition.exhibitionId,
					}))}
					value={selectedExhibitionId}
					onChange={setSelectedExhibitionId}
					placeholder="placeholder"
					actionLabel={
						<span className="flex items-center gap-1">
							<span className="text-body2-bold text-light">새로운 전시</span>
							<span>입장하기</span>
						</span>
					}
					// TODO: 전시 입장 코드 입력 흐름 연결 (보연 담당)
					onActionClick={() => {}}
				/>
			</Modal>

			<Modal
				open={isDeleteModalOpen}
				onOpenChange={setIsDeleteModalOpen}
				title="작품 삭제"
				titleTone="danger"
				description={
					<span className="text-light">
						<span className="text-body1-bold">{artwork.title}</span>
						{josa.pick(artwork.title, "이/가")} 작가 프로필과 참여 중인 전시에서 모두 삭제돼요.
						삭제한 작품은 복구할 수 없어요.
					</span>
				}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsDeleteModalOpen(false) },
					{ text: "삭제하기", variant: "danger", onClick: handleDelete },
				]}
			/>
		</article>
	);
}
