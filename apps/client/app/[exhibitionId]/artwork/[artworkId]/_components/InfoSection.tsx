import { Chip } from "@/components/common/Chip/Chip";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkDetail } from "@/lib/api/artwork";
import { getArtworkInfoLines } from "@/lib/utils/artworkInfo";

/**
 * 그룹 또는 카테고리 칩
 * 작품 제목 (title)
 * 제작 연도, 재료 / 크기 : 선택값
 * 작가·역할 행은 변경된 작품 UI(Figma)에 따라 두록·전시 모두 노출하지 않는다
 */

interface InfoSectionProps {
	data: ArtworkDetail;
	groupName?: string | null;
}

export const InfoSection = ({ data, groupName }: InfoSectionProps) => {
	const topLabel = groupName !== undefined ? groupName : data.category;
	const categories = topLabel ? [topLabel] : [];
	const lines = getArtworkInfoLines(data);

	return (
		<section className="flex flex-col pb-6 min-[721px]:pb-7">
			<DesktopContainer>
				<div className="mt-8">
					{categories.map((cat) => (
						<Chip key={cat} label={cat} type="assistive" selected={true} className="mb-2.5" />
					))}
					<Title title={data.title} margin="none" className="text-title1 break-all" />
					{lines.length > 0 && (
						<div className="mt-6">
							{lines.map((line) => (
								<p key={line} className="text-body1 whitespace-pre-line">
									{line}
								</p>
							))}
						</div>
					)}
				</div>
			</DesktopContainer>
		</section>
	);
};
