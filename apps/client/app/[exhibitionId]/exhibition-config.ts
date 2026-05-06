export interface ExhibitionConfig {
	logoSrc: string;
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

export const MOCK_EXHIBITION_CONFIG: Record<string, ExhibitionConfig> = {
	"1": {
		logoSrc: "/images/exhibitionLogo.svg",
		themeMode: "light",
		btnBg: "#FFF0E6",
		btnText: "#C45C1A",
		ctaBg: "#E8621A",
		ctaText: "#FFF5EE",
		footerInfo: {
			title: "흙에서 시작되는 모든 이야기",
			department: "한국대학교 예술대학 도예과",
			address: "서울 중구 필동로1길 30",
			addressDetail: "동국대학교 문화관 지하 1층 동국갤러리",
			email: "dgu_art@dongguk.edu",
			copyright: "©2025. Dongguk University Sculpture Department Exhibition.",
		},
	},
	"2": {
		logoSrc: "/images/exhibitionLogo.svg",
		themeMode: "dark",
		btnBg: "#FFF0E6",
		btnText: "#C45C1A",
		ctaBg: "#E8621A",
		ctaText: "#FFF5EE",
		footerInfo: {
			title: "되돌아가는 삶",
			department: "한국대학교 불교미술전공",
			address: "서울 중구 필동로1길 30",
			addressDetail: "예술관 지하1층 101호",
			email: "dgu_art@dongguk.edu",
			copyright: "©2025. Dongguk University Buddhist Art Exhibition.",
		},
	},
};

export const DEFAULT_EXHIBITION_CONFIG: ExhibitionConfig = MOCK_EXHIBITION_CONFIG["1"];
