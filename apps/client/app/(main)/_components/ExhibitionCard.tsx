import Image from "next/image";

export interface ExhibitionItem {
	id: string;
	title: string;
	univName: string;
	deptName: string;
	location: string;
	imageUrl: string;
	startDate: string;
	endDate: string;
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
			<div className="relative self-stretch h-40 aspect-3/4 shrink-0 overflow-hidden">
				<Image src={imageUrl} alt={title} fill />
			</div>
			<div className="flex flex-col gap-1">
				<h3 className="text-head3 text-strong">{title}</h3>
				<p className="text-body2 text-light">
					{univName} · {deptName}
				</p>
				<p className="text-body2 text-light">{location}</p>
				<p className="text-body2 text-light">
					{formatDate(startDate)} ~ {formatDate(endDate)}
				</p>
			</div>
		</article>
	);
}
