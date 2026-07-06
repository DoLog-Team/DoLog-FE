import Image from "next/image";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import type { ExhibitionItem } from "@/lib/api/exhibition";

const formatDate = (date: string) => date.replace(/-/g, ".");

export default function ExhibitionCard({
	title,
	univName,
	deptName,
	address,
	imageUrl,
	startDate,
	endDate,
}: Omit<ExhibitionItem, "id">) {
	return (
		<article className="flex gap-4 min-[721px]:flex-col min-[721px]:gap-3">
			<div className="relative self-stretch h-40 aspect-[1/1.414] shrink-0 overflow-hidden min-[721px]:h-auto min-[721px]:w-full">
				{imageUrl ? (
					<Image src={imageUrl} alt={title} fill className="object-cover" />
				) : (
					<EmptyImageFallback className="absolute inset-0" />
				)}
			</div>
			<div className="flex flex-col gap-1">
				<h3 className="text-head3 text-strong">{title}</h3>
				<p className="text-body2 text-light">
					{univName} · {deptName}
				</p>
				{address && <p className="text-body2 text-light">{address}</p>}
				{startDate && endDate && (
					<p className="text-body2 text-light">
						{formatDate(startDate)} ~ {formatDate(endDate)}
					</p>
				)}
			</div>
		</article>
	);
}
