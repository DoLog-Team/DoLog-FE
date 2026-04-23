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

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
