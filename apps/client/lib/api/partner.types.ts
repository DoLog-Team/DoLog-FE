export interface PartnerMember {
	member_id: string;
	member_name: string;
	member_name_en?: string;
	member_email?: string;
	member_image_url?: string;
	member_order?: number | null;
}

export interface PartnerPart {
	order: number;
	part_id: string;
	part_name: string;
	members: PartnerMember[];
}
