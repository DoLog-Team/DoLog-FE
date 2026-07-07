import { Title } from "@/components/common/Title/Title";
import type { ExhibitionLocation } from "@/lib/api/exhibition";
import { CopyAddressButton } from "./CopyAddressButton";
import { LocationMap } from "./LocationMap";

interface ExhibitionLocationProps {
	location: ExhibitionLocation;
}

export function ExhibitionLocationSection({ location }: ExhibitionLocationProps) {
	return (
		<section className="flex flex-col pb-6" data-section="location">
			<Title title="장소" />
			<div className="flex flex-col min-[721px]:flex-row min-[721px]:gap-5">
				<div className="min-[721px]:w-[40%] min-[721px]:shrink-0">
					<LocationMap
						address={location.address}
						lat={location.latitude}
						lng={location.longitude}
					/>
				</div>
				{/* 모바일: 지도 아래에 주소 텍스트 */}
				<div className="flex flex-col gap-1 min-[721px]:hidden">
					<p className="text-body1">{location.address}</p>
					{location.detail_location && <p className="text-body1">{location.detail_location}</p>}
					{location.location_description && (
						<p className="text-body1">{location.location_description}</p>
					)}
				</div>
				{/* 데스크탑: 지도 오른쪽에 주소 텍스트 + 복사 버튼 */}
				<div className="hidden min-[721px]:flex flex-col gap-7 text-body1 text-light">
					<div className="flex flex-col">
						<p>{location.address}</p>
						{location.detail_location && <p>{location.detail_location}</p>}
						{location.location_description && <p>{location.location_description}</p>}
					</div>
					<CopyAddressButton address={location.address} />
				</div>
			</div>
		</section>
	);
}
