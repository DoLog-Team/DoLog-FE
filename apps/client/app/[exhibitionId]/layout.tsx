import SchoolFooter from "@/components/common/Footer/SchoolFooter";
import { ThemeProvider } from "@/providers/theme-providers";
import { DEFAULT_EXHIBITION_CONFIG, MOCK_EXHIBITION_CONFIG } from "./exhibition-config";

export default async function ExhibitionLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ exhibitionId: string }>;
}) {
	const { exhibitionId } = await params;
	const config = MOCK_EXHIBITION_CONFIG[exhibitionId] ?? DEFAULT_EXHIBITION_CONFIG;

	const colorVars = {
		...(config.btnBg && { "--btn-bg": config.btnBg }),
		...(config.btnText && { "--btn-text": config.btnText }),
		...(config.ctaBg && { "--cta-bg": config.ctaBg }),
		...(config.ctaText && { "--cta-text": config.ctaText }),
	} as React.CSSProperties;

	return (
		<ThemeProvider
			attribute="class"
			forcedTheme={config.themeMode}
			enableColorScheme={true}
			colors={{
				btnBg: config.btnBg,
				btnText: config.btnText,
				ctaBg: config.ctaBg,
				ctaText: config.ctaText,
			}}
		>
			<div className="bg-normal text-strong min-h-dvh flex flex-col" style={colorVars}>
				<div className="min-h-dvh flex flex-col w-full max-w-135 mx-auto">{children}</div>

				<SchoolFooter logoSrc={config.footerInfo.logoSrc} {...config.footerInfo} />
			</div>
		</ThemeProvider>
	);
}
