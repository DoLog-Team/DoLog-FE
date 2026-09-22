export interface ArtworkPlaceholderSectionProps {
	title: string;
}

export const ArtworkPlaceholderSection = ({ title }: ArtworkPlaceholderSectionProps) => {
	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">{title}</h2>
			</div>
			<div className="min-w-0 flex-1 text-lightest">준비 중인 탭이에요.</div>
		</div>
	);
};
