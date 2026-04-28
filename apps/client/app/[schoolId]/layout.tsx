import SchoolFooter from "@/components/common/Footer/SchoolFooter";
import { ThemeProvider } from "@/providers/theme-providers";
import { MOCK_SCHOOL_DATA } from "./school-config";

export default async function SchoolLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ schoolId: string }>;
}) {
	const { schoolId } = await params;
	const schoolData = MOCK_SCHOOL_DATA[schoolId] || MOCK_SCHOOL_DATA.dgu;

	const colorVars = {
		...(schoolData.btnBg && { "--btn-bg": schoolData.btnBg }),
		...(schoolData.btnText && { "--btn-text": schoolData.btnText }),
		...(schoolData.ctaBg && { "--cta-bg": schoolData.ctaBg }),
		...(schoolData.ctaText && { "--cta-text": schoolData.ctaText }),
	} as React.CSSProperties;

	return (
		<ThemeProvider
			attribute="class"
			forcedTheme={schoolData.themeMode}
			enableColorScheme={true}
			colors={{
				btnBg: schoolData.btnBg,
				btnText: schoolData.btnText,
				ctaBg: schoolData.ctaBg,
				ctaText: schoolData.ctaText,
			}}
		>
			<div className="bg-normal text-strong min-h-dvh flex flex-col" style={colorVars}>
				<div className="min-h-dvh flex flex-col w-full max-w-135 mx-auto">{children}</div>

				<SchoolFooter logoSrc={schoolData.footerInfo.logoSrc} {...schoolData.footerInfo} />
			</div>
		</ThemeProvider>
	);
}
