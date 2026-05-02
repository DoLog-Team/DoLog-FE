import { Chip } from "@/components/common/Chip/Chip";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";

/**
 * 작품 제목 (title)
 * 카테고리 (category)
 * 작품 재료 (materials) : 선택값
 * 작품 크기 (size) : 선택값
 * 작가 (authors)
 *
 */
interface InfoSectionProps {
	data: {
		title: string;
		category: string; // "생활 도자기" 등
		materials?: string;
		size?: string;
		authors: { name: string; role: string }[];
	};
}

// RowList를 위한 작가정보 map
export const InfoSection = ({ data }: InfoSectionProps) => {
	const categories = [data.category];
	const artistRows = data.authors.map((authors) => ({
		label: authors.name,
		value: authors.role,
	}));

	return (
		<section className="flex flex-col px-4 pb-6">
			<div className="mt-6 mb-2.5">
				{categories.map((cat) => (
					<Chip key={cat} label={cat} type="assistive" selected={true} />
				))}
				<Title title={data.title} />

				{/* 작품 재료, 작품 사이즈 - 선택값 */}
				{(data.materials || data.size) && (
					<p className="text-body1">{[data.materials, data.size].filter(Boolean).join(" | ")}</p>
				)}
			</div>
			<div>
				<RowList rows={artistRows} />
			</div>
		</section>
	);
};
