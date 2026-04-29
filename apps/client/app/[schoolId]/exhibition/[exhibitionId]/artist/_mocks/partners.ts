export interface Member {
  member_id: string;
  member_name: string;
  member_name_en: string | null;
  member_email: string | null;
  member_image_url: string | null;
}

export interface Part {
  part_id: string;
  part_name: string;
  order: number;
  members: Member[];
}

export const MOCK_PARTNERS: Part[] = [
  {
    part_id: "p1b2c3d4-e29b-41d4-a716-446655440001",
    part_name: "지도 교수님",
    order: 1,
    members: [
      {
        member_id: "m1",
        member_name: "홍길동",
        member_name_en: null,
        member_email: "hong@dolog.site",
        member_image_url: null,
      },
      {
        member_id: "m2",
        member_name: "김철수",
        member_name_en: "Kim Cheolsu",
        member_email: "kim@dolog.site",
        member_image_url: null,
      },
    ],
  },
  {
    part_id: "p1b2c3d4-e29b-41d4-a716-446655440002",
    part_name: "전시 준비 위원회",
    order: 2,
    members: [
      {
        member_id: "m3",
        member_name: "이영희",
        member_name_en: "Lee Younghee",
        member_email: "lee@dolog.site",
        member_image_url: null,
      },
      {
        member_id: "m4",
        member_name: "박민준",
        member_name_en: "Park Minjun",
        member_email: null,
        member_image_url: null,
      },
    ],
  },
];
