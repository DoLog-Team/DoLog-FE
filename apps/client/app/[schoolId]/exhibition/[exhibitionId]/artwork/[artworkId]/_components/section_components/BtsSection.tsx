interface BtsItem {
	id: number;
	title: string;
	author: string;
	imageUrl: string;
}

interface BtsSectionProps {
	bts: BtsItem[];
}

export const BtsSection = ({ bts }: BtsSectionProps) => {
	return (
		<section className="flex flex-col px-4 pb-6">
			<h3 className="text-lg font-semibold mb-6">Behind The Scene</h3>

			<div className="flex flex-col gap-4">
				{bts.map((item) => (
					<div key={item.id} className="flex items-center gap-4">
						{/* 썸네일 이미지 */}
						<div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
							{/* <Image src={item.imageUrl} alt={item.title} fill className="object-cover" /> */}
							<div className="flex h-full items-center justify-center text-[10px] text-gray-400">
								BTS
							</div>
						</div>

						{/* 텍스트 정보 */}
						<div className="flex flex-col">
							<span className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</span>
							<span className="text-xs text-gray-500 mt-0.5">{item.author}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
