import { Chip } from "@/components/common/Chip/Chip";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";

interface InfoSectionProps {
	data: {
		title: string;
		category: string; // "생활 도자기" 등
		materials: string;
		size: string;
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
			<div className="mt-6 mb-[10px]">
				{categories.map((cat) => (
					<Chip key={cat} label={cat} type="assistive" selected={true} />
				))}
				<Title title={data.title} />
				<p className="text-body1">
					{data.materials} | {data.size}
				</p>
			</div>
			<div>
				<RowList rows={artistRows} />
			</div>
		</section>
	);
};
