"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

interface Props extends ThemeProviderProps{
  colors?: {
    btnBg?: string;
    btnText?: string;
    ctaBg?: string;
    ctaText?: string;
  };
}

export function ThemeProvider({ children, colors, ...props }: Props) {
  useEffect(() => {
    if (!colors) return;
    const root = document.documentElement;
    if (colors.btnBg)   root.style.setProperty("--btn-bg",   colors.btnBg);
    if (colors.btnText) root.style.setProperty("--btn-text", colors.btnText);
    if (colors.ctaBg)   root.style.setProperty("--cta-bg",   colors.ctaBg);
    if (colors.ctaText) root.style.setProperty("--cta-text", colors.ctaText);
  }, [colors]);
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
