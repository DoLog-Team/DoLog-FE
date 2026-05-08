import { Title } from "@/components/common/Title/Title";
import type {
	ExhibitionLocation
} from "@/lib/api/exhibition";
import { LocationMap } from "./LocationMap";

interface ExhibitionLocationProps {
	location: ExhibitionLocation;
}

export function ExhibitionLocationSection({ location }: ExhibitionLocationProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="장소" />
			{/* WIP : 네이버지도 api 호출 오류 해결 중 */}
			<LocationMap address={location.address} />
			<p className="text-body1">{location.address}</p>
			{location.detail_location && <p className="text-body1">{location.detail_location}</p>}
		</section>
	);
}
