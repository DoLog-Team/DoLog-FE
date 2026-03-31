import { ThemeProvider } from "@/providers/theme-providers";
import SchoolFooter from "@/components/common/Footer/SchoolFooter";

interface SchoolConfig {
  schoolName: string;
  themeMode: "light" | "dark";
  mainColor: string;
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
    mainColor: "custom1",
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
    mainColor: "custom1",
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

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme={schoolData.themeMode}
      enableColorScheme={true}
    >
      <div
        className="bg-normal text-strong min-h-dvh flex flex-col"
        style={
          {
            "--main-color": `var(--${schoolData.mainColor})`,
          } as React.CSSProperties
        }
      >
        <div className="min-h-dvh flex flex-col px-4">{children}</div>

        <SchoolFooter
          logoSrc={schoolData.footerInfo.logoSrc}
          {...schoolData.footerInfo}
        />
      </div>
    </ThemeProvider>
  );
}
