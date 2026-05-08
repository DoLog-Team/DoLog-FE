import SchoolFooter from "@/components/common/Footer/SchoolFooter";
import { ThemeProvider } from "@/providers/theme-providers";
import { getExhibitionCustom } from "./_api/getExhibitionCustom";
import { resolveExhibitionId } from "./_api/resolveExhibitionId";
import { DEFAULT_EXHIBITION_CONFIG } from "./exhibition-config";

export default async function ExhibitionLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ exhibitionId: string }>;
}) {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);
	const custom = uuid ? await getExhibitionCustom(uuid) : null;
	console.log("[exhibitionCustom]", JSON.stringify(custom, null, 2));

	const config = {
		...DEFAULT_EXHIBITION_CONFIG,
		...(custom && {
			themeMode: custom.theme_mode,
			btnBg: custom.btn_bg ?? undefined,
			btnText: custom.btn_text ?? undefined,
			ctaBg: custom.cta_bg ?? undefined,
			ctaText: custom.cta_text ?? undefined,
		}),
	};

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
