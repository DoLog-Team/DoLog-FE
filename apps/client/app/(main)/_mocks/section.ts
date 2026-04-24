import type { CardItem } from "@/components/common/Card/Card.types";

export interface SectionItem {
  title: string;
  categories: string[];
  artworks: Record<string, CardItem[]>;
}

export const MOCK_SECTIONS: SectionItem[] = [
  {
    title: "회화",
    categories: ["전체", "서양화", "동양화", "한국화", "불교 미술"],
    artworks: {
      전체: [
        {
          id: 1,
          imageUrl: "/images/cups.png",
          title: "여백",
          category: "서양화",
          author: "강승기",
        },
        {
          id: 5,
          imageUrl: "/images/plate.png",
          title: "산수",
          category: "동양화",
          author: "김민준",
        },
        {
          id: 9,
          imageUrl: "/images/pottery.png",
          title: "민화",
          category: "한국화",
          author: "정도윤",
        },
        {
          id: 13,
          imageUrl: "/images/pottery.png",
          title: "연화",
          category: "불교 미술",
          author: "한지수",
        },
      ],
      서양화: [
        {
          id: 1,
          imageUrl: "/images/cups.png",
          title: "여백",
          category: "서양화",
          author: "강승기",
        },
        {
          id: 2,
          imageUrl: "/images/cups.png",
          title: "2000년 후",
          category: "서양화",
          author: "배수향",
        },
        {
          id: 3,
          imageUrl: "/images/cups.png",
          title: "무한",
          category: "서양화",
          author: "손수현",
        },
        {
          id: 4,
          imageUrl: "/images/cups.png",
          title: "1-0-8",
          category: "서양화",
          author: "박수향",
        },
      ],
      동양화: [
        {
          id: 5,
          imageUrl: "/images/plate.png",
          title: "산수",
          category: "동양화",
          author: "김민준",
        },
        {
          id: 6,
          imageUrl: "/images/plate.png",
          title: "춘하추동",
          category: "동양화",
          author: "이서연",
        },
        {
          id: 7,
          imageUrl: "/images/plate.png",
          title: "묵향",
          category: "동양화",
          author: "박지훈",
        },
        {
          id: 8,
          imageUrl: "/images/plate.png",
          title: "청풍",
          category: "동양화",
          author: "최수아",
        },
      ],
      한국화: [
        {
          id: 9,
          imageUrl: "/images/pottery.png",
          title: "민화",
          category: "한국화",
          author: "정도윤",
        },
        {
          id: 10,
          imageUrl: "/images/pottery.png",
          title: "화조도",
          category: "한국화",
          author: "윤하은",
        },
        {
          id: 11,
          imageUrl: "/images/pottery.png",
          title: "책거리",
          category: "한국화",
          author: "임재원",
        },
        {
          id: 12,
          imageUrl: "/images/pottery.png",
          title: "봄날",
          category: "한국화",
          author: "강민서",
        },
      ],
      "불교 미술": [
        {
          id: 13,
          imageUrl: "/images/pottery.png",
          title: "연화",
          category: "불교 미술",
          author: "한지수",
        },
        {
          id: 14,
          imageUrl: "/images/pottery.png",
          title: "법신",
          category: "불교 미술",
          author: "오승현",
        },
        {
          id: 15,
          imageUrl: "/images/pottery.png",
          title: "만다라",
          category: "불교 미술",
          author: "류채원",
        },
        {
          id: 16,
          imageUrl: "/images/pottery.png",
          title: "보리수",
          category: "불교 미술",
          author: "신예진",
        },
      ],
    },
  },
  {
    title: "오브제",
    categories: ["전체", "도예", "조소", "금속"],
    artworks: {
      전체: [
        {
          id: 17,
          imageUrl: "/images/cups.png",
          title: "흙의 형태",
          category: "도예",
          author: "이지원",
        },
        {
          id: 21,
          imageUrl: "/images/plate.png",
          title: "공간",
          category: "조소",
          author: "박현우",
        },
        {
          id: 25,
          imageUrl: "/images/pottery.png",
          title: "금속의 결",
          category: "금속",
          author: "김도현",
        },
        {
          id: 26,
          imageUrl: "/images/pottery.png",
          title: "선",
          category: "금속",
          author: "최은지",
        },
      ],
      도예: [
        {
          id: 17,
          imageUrl: "/images/cups.png",
          title: "흙의 형태",
          category: "도예",
          author: "이지원",
        },
        {
          id: 18,
          imageUrl: "/images/cups.png",
          title: "그릇",
          category: "도예",
          author: "정수빈",
        },
        {
          id: 19,
          imageUrl: "/images/cups.png",
          title: "도자기",
          category: "도예",
          author: "한민지",
        },
        {
          id: 20,
          imageUrl: "/images/cups.png",
          title: "물레",
          category: "도예",
          author: "오채연",
        },
      ],
      조소: [
        {
          id: 21,
          imageUrl: "/images/plate.png",
          title: "공간",
          category: "조소",
          author: "박현우",
        },
        {
          id: 22,
          imageUrl: "/images/plate.png",
          title: "형태",
          category: "조소",
          author: "윤서준",
        },
        {
          id: 23,
          imageUrl: "/images/plate.png",
          title: "균형",
          category: "조소",
          author: "임나연",
        },
        {
          id: 24,
          imageUrl: "/images/plate.png",
          title: "덩어리",
          category: "조소",
          author: "강태양",
        },
      ],
      금속: [
        {
          id: 25,
          imageUrl: "/images/pottery.png",
          title: "금속의 결",
          category: "금속",
          author: "김도현",
        },
        {
          id: 26,
          imageUrl: "/images/pottery.png",
          title: "선",
          category: "금속",
          author: "최은지",
        },
        {
          id: 27,
          imageUrl: "/images/pottery.png",
          title: "면",
          category: "금속",
          author: "류준호",
        },
        {
          id: 28,
          imageUrl: "/images/pottery.png",
          title: "점",
          category: "금속",
          author: "신하은",
        },
      ],
    },
  },
];
