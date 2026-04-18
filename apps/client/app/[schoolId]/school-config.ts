export interface SchoolConfig {
	schoolName: string;
	themeMode: "light" | "dark";
	btnBg?: string;
	btnText?: string;
	ctaBg?: string;
	ctaText?: string;
	footerInfo: {
		title: string;
		department: string;
		address: string;
		addressDetail: string;
		email: string;
		copyright: string;
		logoSrc?: string;
	};
}

export const MOCK_SCHOOL_DATA: Record<string, SchoolConfig> = {
	dgu: {
		schoolName: "동국대학교",
		themeMode: "dark",
		
		btnBg: "#FFF0E6",
		btnText: "#C45C1A",
		ctaBg: "#E8621A",
		ctaText: "##FFF5EE",
		footerInfo: {
			title: "도예과 졸업 전시",
			department: "동국대학교 예술대학 도예과",
			address: "서울 중구 필동로1길 30",
			addressDetail: "동국대학교 문화관 지하 1층 동국갤러리",
			email: "dgu_art@dongguk.edu",
			copyright: "©2025. Dongguk University Sculpture Department Exhibition.",
		},
	},
	snu: {
		schoolName: "서울대학교",
		themeMode: "light",
		btnBg: "#FFE4E1",
		btnText: "#FF69B4",
		ctaBg: "#DB7093",
		ctaText: "#ffffff",
		footerInfo: {
			title: "서울대학교 미술대학 졸업 주간",
			department: "서울대학교 미술대학 디자인과",
			address: "서울 관악구 관악로 1",
			addressDetail: "서울대학교 미술대학 52동 전시실",
			email: "snu_design@snu.ac.kr",
			copyright: "©2025. SNU Design Graduation Committee.",
		},
	},
};
