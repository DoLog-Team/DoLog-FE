import { Button } from "components";
import Link from "next/link";
import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";

interface ExhibitionIntroProps {
	exhibition: Exhibition;
	schoolId: string;
}

interface InfoRowProps {
	label: string;
	value?: string;
}

function InfoRow({ label, value }: InfoRowProps) {
	return (
		<div className="flex gap-4">
			<span className="w-20 shrink-0 text-body2-bold">{label}</span>
			<span className="text-body2">{value}</span>
		</div>
	);
}

export function ExhibitionIntro({ exhibition, schoolId }: ExhibitionIntroProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title={exhibition.title} />
			<div className="flex flex-col gap-2">
				<InfoRow label="주최 대학" value={exhibition.host} />
				<InfoRow label="학과" value={exhibition.department} />
			</div>
			<Link href={`/${schoolId}/exhibition/${exhibition.id}/artwork`}>
				<Button variant="main" className="w-full mt-7">
					전시물 감상하기
				</Button>
			</Link>
		</section>
	);
}
