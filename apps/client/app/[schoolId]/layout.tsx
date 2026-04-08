import { ThemeProvider } from "@/providers/theme-providers";
import SchoolFooter from "@/components/common/Footer/SchoolFooter";

interface SchoolConfig {
  schoolName: string;
  themeMode: "light" | "dark";
  btnBg?: string;
  btnText?: string;
  ctaBg?: string;
  ctaText?: string;
  footerInfo: {
    title: string;
    department: string;
    address: string;
    addressDetail: string;
    email: string;
    copyright: string;
    logoSrc?: string;
  };
}

const MOCK_SCHOOL_DATA: Record<string, SchoolConfig> = {
  dgu: {
    schoolName: "동국대학교",
    themeMode: "dark",
    btnBg: "#391306",
    btnText: "#ff4400",
    ctaBg: "#ff4400",
    ctaText: "#ffffff",
    footerInfo: {
      title: "도예과 졸업 전시",
      department: "동국대학교 예술대학 도예과",
      address: "서울 중구 필동로1길 30",
      addressDetail: "동국대학교 문화관 지하 1층 동국갤러리",
      email: "dgu_art@dongguk.edu",
      copyright: "©2025. Dongguk University Sculpture Department Exhibition.",
    },
  },
  snu: {
    schoolName: "서울대학교",
    themeMode: "light",
    btnBg: "#391306",
    btnText: "#ff4400",
    ctaBg: "#ff4400",
    ctaText: "#ffffff",
    footerInfo: {
      title: "서울대학교 미술대학 졸업 주간",
      department: "서울대학교 미술대학 디자인과",
      address: "서울 관악구 관악로 1",
      addressDetail: "서울대학교 미술대학 52동 전시실",
      email: "snu_design@snu.ac.kr",
      copyright: "©2025. SNU Design Graduation Committee.",
    },
  },
};

export default async function SchoolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const schoolData = MOCK_SCHOOL_DATA[schoolId] || MOCK_SCHOOL_DATA.dgu;

  const colorVars = [
    schoolData.btnBg && `--btn-bg: ${schoolData.btnBg}`,
    schoolData.btnText && `--btn-text: ${schoolData.btnText}`,
    schoolData.ctaBg && `--cta-bg: ${schoolData.ctaBg}`,
    schoolData.ctaText && `--cta-text: ${schoolData.ctaText}`,
  ]
    .filter(Boolean)
    .join("; ");

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme={schoolData.themeMode}
      enableColorScheme={true}
    >
      {colorVars && (
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { ${colorVars} }`,
          }}
        />
      )}
      <div className="bg-normal text-strong min-h-dvh flex flex-col">
        <div className="min-h-dvh flex flex-col px-4">{children}</div>

        <SchoolFooter
          logoSrc={schoolData.footerInfo.logoSrc}
          {...schoolData.footerInfo}
        />
      </div>
    </ThemeProvider>
  );
}
