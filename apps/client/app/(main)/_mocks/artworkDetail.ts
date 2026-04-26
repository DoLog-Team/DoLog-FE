export const MOCK_ARTWORK_DETAIL = {
  id: 1,
  title: "파도의 그릇",
  image: "/images/artwork.png",
  category: "생활 도자기",
  materials: "청자토, 청화안료",
  size: "지름 22cm x 높이 7cm",
  description: "가장자리와 닮은 물결 곡선은 바람이 스치는 수면을 떠올리게 합니다...",
  locationImageUrl: "/images/map_sample.png", // 작품 위치 이미지
  detailimages: ["/images/detail1.png", "/images/detail2.png"], // 사진 Section용
  authors: [
    {
      name: "배주현",
      role: "메인 디자이너",
      profileUrl: "/images/author1.png",
      description: "일상에서 마주치는 형태를 만들어 손에 닿는 광경을 담고 싶어요.",
      sns: { instagram: "...", behance: "..." }
    }
  ],
  bts: [
    { id: 1, title: "내 클럽 전시 이야기", author: "배주현", imageUrl: "/images/bts1.png" },
    // ...
  ]
};