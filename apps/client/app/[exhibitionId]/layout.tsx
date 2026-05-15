import type { Metadata } from "next";
import MainFooter from "@/components/common/Footer/MainFooter";
import SchoolFooter from "@/components/common/Footer/SchoolFooter";
import { getExhibitions } from "@/lib/api/exhibition";
import { getExhibitionFooter } from "@/lib/api/layout";
import { ThemeProvider } from "@/providers/theme-providers";
import { getExhibitionCustom } from "./_api/getExhibitionCustom";
import { getExhibitionMeta } from "./_api/getExhibitionMeta";
import { resolveExhibitionId } from "./_api/resolveExhibitionId";
import { TabBarSpacer } from "./_components/TabBarSpacer";
import { ExhibitionProvider } from "./_context/ExhibitionContext";
import { DEFAULT_EXHIBITION_CONFIG } from "./exhibition-config";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ exhibitionId: string }>;
}): Promise<Metadata> {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);
	const meta = uuid ? await getExhibitionMeta(uuid) : null;

	return {
		title: meta?.title ?? "두록",
		description: meta?.description ?? "우리의 졸업 전시, 더 오래 기록하는 방법",
		icons: { icon: meta?.favicon ?? "/favicon.ico" },
		openGraph: {
			title: meta?.title ?? "두록",
			description: meta?.description ?? "우리의 졸업 전시, 더 오래 기록하는 방법",
			images: meta?.image ? [{ url: meta.image }] : [{ url: "/images/og-default.png" }],
		},
	};
}

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

	// TODO : /{slug} 또는 uuid 단건 조회 api get 가능할지 물어보기
	// 예상 : const exhibition = await getExhibitionBySlug(exhibitionId);
	const exhibitions = await getExhibitions();
	const exhibition = exhibitions.find((e) => e.slug === exhibitionId);
	exhibitions.find((e) => e.id === uuid);

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

	const footer = uuid ? await getExhibitionFooter(uuid) : null;

	const colorVars = {
		...(config.btnBg && { "--btn-bg": config.btnBg }),
		...(config.btnText && { "--btn-text": config.btnText }),
		...(config.ctaBg && { "--cta-bg": config.ctaBg }),
		...(config.ctaText && { "--cta-text": config.ctaText }),
	} as React.CSSProperties;

	return (
		<ExhibitionProvider slug={exhibition?.slug ?? exhibitionId} logoImg={exhibition?.logoImg ?? ""}>
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

					{footer ? (
						<SchoolFooter
							logoSrc={config.footerInfo.logoSrc}
							title={footer.title}
							department={footer.department}
							address={footer.address ?? ""}
							detail_location={footer.detail_location ?? ""}
							email={footer.email}
							copyright={footer.copyright ?? ""}
						/>
					) : (
						<MainFooter />
					)}
					<TabBarSpacer />
				</div>
			</ThemeProvider>
		</ExhibitionProvider>
	);
}
