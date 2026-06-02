import type { Metadata } from "next";
import { ExhibitionPageTracker } from "@/components/common/ExhibitionPageTracker";
import MainFooter from "@/components/common/Footer/MainFooter";
import SchoolFooter from "@/components/common/Footer/SchoolFooter";
import { getExhibitionDetail, getExhibitions } from "@/lib/api/exhibition";
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
	const [meta, detail] = await Promise.all([
		uuid ? getExhibitionMeta(uuid) : null,
		uuid ? getExhibitionDetail(uuid) : null,
	]);

	const exhibitionName = meta?.title ?? detail?.title ?? "";
	const orgName = detail ? `${detail.univName} ${detail.deptName}` : "";
	const exhibitionType = detail?.exhibitionType ?? "";

	const titleBase = [orgName, exhibitionType, exhibitionName].filter(Boolean).join(" ");
	const title = titleBase ? `${titleBase} | 두록(Dolog)` : "두록(Dolog)";

	const autoDescription = detail
		? `${orgName}${exhibitionType ? ` ${exhibitionType}` : ""} ${exhibitionName}의 온라인 전시 아카이브입니다. 전시, 작품 정보와 참여 작가를 두록(Dolog)에서 확인할 수 있습니다.`
		: "두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다. 졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.";
	const description = meta?.description ?? autoDescription;

	const canonicalUrl = `https://dolog.kr/${exhibitionId}`;
	const ogImage = meta?.image ? [{ url: meta.image }] : [{ url: "/images/og-default.png" }];

	return {
		title,
		description,
		icons: { icon: meta?.favicon ?? "/favicon.ico" },
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type: "website",
			url: canonicalUrl,
			siteName: "두록(Dolog)",
			locale: "ko_KR",
			title,
			description,
			images: ogImage,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ogImage.map((img) => img.url),
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
					<ExhibitionPageTracker />
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
