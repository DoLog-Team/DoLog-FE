import { Title } from "@/components/common/Title/Title";
import type { ExhibitionLocation } from "@/lib/api/exhibition";
import { LocationMap } from "./LocationMap";

interface ExhibitionLocationProps {
	location: ExhibitionLocation;
}

export function ExhibitionLocationSection({ location }: ExhibitionLocationProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="장소" />
			<LocationMap address={location.address} lat={location.latitude} lng={location.longitude} />
			<p className="text-body1">{location.address}</p>
			{location.detail_location && <p className="text-body1">{location.detail_location}</p>}
			{location.location_description && <p className="text-body1">{location.location_description}</p>}
		</section>
	);
}
