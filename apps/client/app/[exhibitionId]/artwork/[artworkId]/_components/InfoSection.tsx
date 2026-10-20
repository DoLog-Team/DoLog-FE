import { Chip } from "@/components/common/Chip/Chip";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkDetail } from "@/lib/api/artwork";

/**
 * 작품 제목 (title)
 * 카테고리 (category)
 * 작품 재료 (materials) : 선택값
 * 작품 크기 (size) : 선택값
 * 작가 (authors)
 */

interface InfoSectionProps {
	data: ArtworkDetail;
	hideArtistRole?: boolean;
	// 제목 아래 정보 줄 — 넘기면 재료 | 크기 줄 대신 표시 (두록 작품 상세: 제작 연도, 재료 / 크기)
	// TODO : size, material 관련 데이터 변경 방향 BE 문의 중, 답변 오면 수정 예정
	lines?: string[];
}

// RowList를 위한 작가정보 map
export const InfoSection = ({ data, hideArtistRole, lines }: InfoSectionProps) => {
	const categories = data.category ? [data.category] : [];
	const artistRows = data.participants.map((participant) => ({
		label: participant.nameKo,
		value: participant.role,
	}));

	return (
		<section className="flex flex-col pb-6">
			<DesktopContainer>
				<div className="mt-8 mb-5">
					{categories.map((cat) => (
						<Chip key={cat} label={cat} type="assistive" selected={true} className="mb-2" />
					))}
					<Title title={data.title} margin="none" className="break-all" />

					{/* 작품 재료, 작품 사이즈 - 선택값 */}
					{lines?.map((line) => (
						<p key={line} className="text-body1 mt-1 whitespace-pre-line">
							{line}
						</p>
					))}
					{!lines && (data.material || data.size) && (
						<p className="text-body1 mt-1 whitespace-pre-line">
							{[data.material, data.size].filter(Boolean).join(" | ")}
						</p>
					)}
				</div>
				{!hideArtistRole && (
					<div className="mt-2.5">
						<RowList rows={artistRows} />
					</div>
				)}
			</DesktopContainer>
		</section>
	);
};
