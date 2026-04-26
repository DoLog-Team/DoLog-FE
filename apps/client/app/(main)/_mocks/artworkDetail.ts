export const MOCK_ARTWORK_DETAIL = {
	id: 1,
	exhibitionTitle: "흙에서 시작되는 모든 이야기",
	title: "파도의 그릇",
	image: "/images/artwork/artwork.png",
	category: "생활 도자기",
	materials: "청자토, 청자유",
	size: "지름 22cm × 높이 7cm",
	description:
		"가장자리의 얇은 물결 라인은 바람이 스치는 수면을 떠올리게 한다. 멀리서 보면 단정한 그릇이지만, 가까이 다가가면 빛에 따라 표면의 요철이 천천히 드러나며 '잔잔한 움직임'을 만든다.\n\n형태는 과하게 흔들리지 않도록 중심을 낮게 잡고, 가장자리만 미세하게 리듬을 주어 쓰임과 조형 사이의 균형을 맞췄다. 유약은 빛을 받는 각도에 따라 색의 깊이가 달라지도록 여러 번 테스트하며 조정했고, 그 결과 같은 그릇이라도 시간과 조명에 따라 다른 표정을 보여준다.\n\n일상에서 자주 마주치는 물의 감각을, 조용하지만 오래 남는 장면으로 담아낸 작품이다.",
	locationImageUrl: "/images/artwork/artworkLocation.png",
	detailImages: ["/images/cups.png", "/images/plate.png"],
	authors: [
		{
			name: "배주현",
			nameEn: "Bae JuHyun",
			role: "팀 리더, 작품 기획",
			profileUrl: "/images/artists/artist1.svg",
			description:
				"일상에서 자주 쓰는 그릇을 만들며 '손에 닿는 감정'을 담고 싶었어요. 완벽함보다 사용하며 생기는 흔적을 좋아합니다. 앞으로는 일상의 시간을 조용히 기록하는 작가가 되고 싶습니다.",
			sns: {
				behance: "https://example.com/artists",
				instagram: "https://example.com/artists",
				x: "https://example.com/artists",
			},
		},
		{
			name: "강슬기",
			nameEn: "Kang Seulgi",
			role: "작품 기획, 제작",
			profileUrl: "/images/artists/artist4.png",
			description:
				"소성 후에 생기는 균열이나 깨짐을 보며 오히려 더 솔직한 형태라고 느꼈어요. 실패를 숨기지 않고 작업의 의미로 남겨보려 했습니다. 앞으로는 불완전함을 새 가능성으로 바꾸는 작가가 되고 싶습니다.",
			sns: {
				behance: "https://example.com/artists",
				instagram: "https://example.com/artists",
				x: "https://example.com/artists",
			},
		},
	],
	bts: [
		{ id: 1, title: "내 졸업 전시 이야기", author: "배주현", imageUrl: "/images/artwork/bts1.png" },
		{ id: 2, title: "푸른 색의 미학", author: "배주현", imageUrl: "/images/artwork/bts2.png" },
		{ id: 3, title: "내가 흙을 사랑하는 이유", author: "강슬기", imageUrl: "/images/artwork/bts3.png" },
	],
	prevArtwork: { id: 4, title: "깨진 다음의 모양", author: "강슬기", imageUrl: "/images/artwork/prev.png" },
	nextArtwork: { id: 5, title: "흐린 날의 화병", author: "손승완", imageUrl: "/images/artwork/next.png" },
};
