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
}

// RowList를 위한 작가정보 map
export const InfoSection = ({ data }: InfoSectionProps) => {
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
					{(data.material || data.size) && (
						<p className="text-body1 mt-1 whitespace-pre-line">
							{[data.material, data.size].filter(Boolean).join(" | ")}
						</p>
					)}
				</div>
				{/* TODO : 추후 개선 논의 필요 (이번 전시에서만 [이름-역할] 영역 제외)  */}
				{/* <div className="mt-2.5">
				<RowList rows={artistRows} />
			</div> */}
			</DesktopContainer>
		</section>
	);
};
