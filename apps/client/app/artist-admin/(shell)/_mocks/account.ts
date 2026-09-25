// TODO: 작가 어드민 API 연결 후 제거
export interface MarketingConsents {
	contentPromotion: boolean;
	// 광고성 정보 수신 동의는 이 값을 따라간다
	marketing: boolean;
}

export const MOCK_MARKETING_CONSENTS: MarketingConsents = {
	contentPromotion: true,
	marketing: false,
};
