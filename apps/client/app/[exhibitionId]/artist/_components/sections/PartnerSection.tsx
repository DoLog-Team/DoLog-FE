import { RowCardGrid } from "@/components/common/Card/RowCard/RowCardGrid";
import { Title } from "@/components/common/Title/Title";

import type { PartnerPart } from "../../api/partner";

interface PartnerSectionProps {
	partners: PartnerPart[];
}

export function PartnerSection({ partners }: PartnerSectionProps) {
	return (
		<section className="flex flex-col pt-4">
			<Title title="도움을 주신 분들" />

			{partners
				.sort((a, b) => a.order - b.order)
				.map((part) => (
					<div key={part.part_id} className="flex flex-col mb-6">
						<Title title={part.part_name} size="head2" margin="compact" />

						<RowCardGrid
							items={part.members.map((m) => ({
								id: m.member_id,
								name: m.member_name,
								engName: m.member_name_en ?? undefined,
								email: m.member_email ?? undefined,
								imageUrl: m.member_image_url ?? undefined,
							}))}
						/>
					</div>
				))}
		</section>
	);
}
