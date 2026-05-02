import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";
import { LocationMap } from "./LocationMap";

interface ExhibitionLocationProps {
	location: Exhibition["location"];
}

export function ExhibitionLocation({ location }: ExhibitionLocationProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="장소" />
			{/* WIP : 네이버지도 api 호출 오류 해결 중 */}
			<LocationMap address={location.address} />
			<p className="text-body1">{location.address}</p>
			{location.detail && <p className="text-body1">{location.detail}</p>}
		</section>
	);
}
