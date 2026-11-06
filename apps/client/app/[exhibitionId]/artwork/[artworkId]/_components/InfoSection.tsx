import { Chip } from "@/components/common/Chip/Chip";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkDetail } from "@/lib/api/artwork";
import { getArtworkInfoLines } from "@/lib/utils/artworkInfo";

/**
 * 그룹 또는 카테고리 칩
 * 작품 제목 (title)
 * 제작 연도, 재료 / 크기 : 선택값
 * 작가 (authors)
 */

interface InfoSectionProps {
	data: ArtworkDetail;
	hideArtistRole?: boolean;
	groupName?: string | null;
}

// RowList를 위한 작가정보 map
export const InfoSection = ({ data, hideArtistRole, groupName }: InfoSectionProps) => {
	const topLabel = groupName !== undefined ? groupName : data.category;
	const categories = topLabel ? [topLabel] : [];
	const lines = getArtworkInfoLines(data);
	const artistRows = data.participants.map((participant) => ({
		// 국문 성명이 없으면 영문 성명
		label: participant.nameKo || participant.nameEn || "",
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
					{lines.length > 0 && (
						<div className="mt-4">
							{lines.map((line) => (
								<p key={line} className="text-body1 whitespace-pre-line">
									{line}
								</p>
							))}
						</div>
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
