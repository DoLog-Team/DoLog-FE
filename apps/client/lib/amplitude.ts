import * as amplitude from "@amplitude/analytics-browser";

export const initAmplitude = () => {
	amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? "", {
		autocapture: {
			pageViews: true, // 페이지뷰 + referrer + UTM 자동 수집
			sessions: true,
			elementInteractions: false,
		},
	});
};

export const track = (eventName: string, properties?: Record<string, unknown>) => {
	amplitude.track(eventName, properties);
};

export { amplitude };
