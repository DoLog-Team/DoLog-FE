import type { ArtworkGroup, ExhibitionSettings } from "../_types";

export interface ZoneListResponse {
	zones: { id: string; name: string; description: string | null; orderId: number }[];
}

export interface FieldSettingsResponse {
	required: { mainImg: boolean; size: boolean; materials: boolean; locationMap: boolean };
	hidden: {
		size: boolean;
		materials: boolean;
		locationMap: boolean;
		productionPeriod: boolean;
		productionYear: boolean;
	};
}

export const toGroups = (zones: ZoneListResponse["zones"]): ArtworkGroup[] =>
	zones.map((zone) => ({ id: zone.id, name: zone.name, description: zone.description ?? "" }));

export const fromFieldSettings = ({
	required,
	hidden,
}: FieldSettingsResponse): Omit<ExhibitionSettings, "groups"> => ({
	required: {
		image: required.mainImg,
		size: required.size,
		material: required.materials,
		location: required.locationMap,
	},
	hidden: {
		size: hidden.size,
		material: hidden.materials,
		location: hidden.locationMap,
		period: hidden.productionPeriod,
		year: hidden.productionYear,
	},
});

export const toFieldSettings = ({
	required,
	hidden,
}: Omit<ExhibitionSettings, "groups">): FieldSettingsResponse => ({
	required: {
		mainImg: required.image,
		size: required.size,
		materials: required.material,
		locationMap: required.location,
	},
	hidden: {
		size: hidden.size,
		materials: hidden.material,
		locationMap: hidden.location,
		productionPeriod: hidden.period,
		productionYear: hidden.year,
	},
});
