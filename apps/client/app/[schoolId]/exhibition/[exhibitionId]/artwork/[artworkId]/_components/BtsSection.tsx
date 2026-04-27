import Image from "next/image";
import { Title } from "@/components/common/Title/Title";

// TODO : 머지 후 BTSCardGrid 컴포넌트 import 예정
// import { BTSCardGrid, BTSCardGridProps } from "../BTSCardGrid";

interface BtsSectionProps {
	bts: { id: number; title: string; author: string; imageUrl: string }[];
	// 		bts: BTSCardGridProps["items"]
}

export const BtsSection = ({ bts }: BtsSectionProps) => {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="Behind The Scene" />
			{/* 머지 후 BTS 카드 아래와 같이 연결 예정 */}
			{/* <BTSCardGrid items={bts} /> */}

			{/* 임시 예시입니다 */}
			<div className="flex flex-col gap-4">
				{bts.map((item) => (
					<div key={item.id} className="flex items-center gap-4">
						<div className="relative w-16 h-16">
							<Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
							<div className="flex h-full items-center justify-center text-[10px] text-gray-400">
								BTS
							</div>
						</div>
						<div className="flex flex-col">
							<span className="text-body1-bold">{item.title}</span>
							<span className="text-body2">{item.author}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
