"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

interface Props extends ThemeProviderProps {
	colors?: {
		btnBg?: string;
		btnText?: string;
		ctaBg?: string;
		ctaText?: string;
	};
}

export function ThemeProvider({ children, colors, ...props }: Props) {
	useEffect(() => {
		const root = document.documentElement;
		if (!colors) {
			root.style.removeProperty("--btn-bg");
			root.style.removeProperty("--btn-text");
			root.style.removeProperty("--cta-bg");
			root.style.removeProperty("--cta-text");
			return;
		}
		if (colors.btnBg) root.style.setProperty("--btn-bg", colors.btnBg);
		if (colors.btnText) root.style.setProperty("--btn-text", colors.btnText);
		if (colors.ctaBg) root.style.setProperty("--cta-bg", colors.ctaBg);
		if (colors.ctaText) root.style.setProperty("--cta-text", colors.ctaText);
	}, [colors]);

	return (
		<NextThemesProvider scriptProps={THEME_SCRIPT_PROPS} {...props}>
			{children}
		</NextThemesProvider>
	);
}

// next-themes 는 테마 깜빡임 방지용 <script> 를 렌더링하는데, React 19 는 클라이언트 렌더링 중 script 를 만나면 경고한다
// 서버 HTML 에서는 그대로 실행되게 두고, 클라이언트에서만 실행되지 않는 type 으로 바꿔 경고를 없앤다 (next-themes#349)
const THEME_SCRIPT_PROPS =
	typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);
