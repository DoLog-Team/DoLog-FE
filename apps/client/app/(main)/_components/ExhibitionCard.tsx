import Image from "next/image";

export interface ExhibitionItem {
	id: string;
	slug?: string;
	title: string;
	univName: string;
	deptName: string;
	location?: string;
	imageUrl: string | null;
	startDate: string | null;
	endDate: string | null;
}

const formatDate = (date: string) => date.replace(/-/g, ".");

export default function ExhibitionCard({
	title,
	univName,
	deptName,
	location,
	imageUrl,
	startDate,
	endDate,
}: Omit<ExhibitionItem, "id">) {
	return (
		<article className="flex gap-4">
			<div className="relative self-stretch h-40 aspect-[1/1.414] shrink-0 overflow-hidden">
				{imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover"/>}
			</div>
			<div className="flex flex-col gap-1">
				<h3 className="text-head3 text-strong">{title}</h3>
				<p className="text-body2 text-light">
					{univName} · {deptName}
				</p>
				{location && <p className="text-body2 text-light">{location}</p>}
				{startDate && endDate && (
					<p className="text-body2 text-light">
						{formatDate(startDate)} ~ {formatDate(endDate)}
					</p>
				)}
			</div>
		</article>
	);
}
