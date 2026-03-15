import { ThemeProvider } from "@/providers/theme-providers";

interface SchoolConfig {
  schoolName: string;
  themeMode: "light" | "dark";
  mainColor: string;
}

const MOCK_SCHOOL_DATA: Record<string, SchoolConfig> = {
  dgu: { schoolName: "동국대학교", themeMode: "dark", mainColor: "custom1" },
  snu: { schoolName: "서울대학교", themeMode: "light", mainColor: "custom3" },
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
        className="min-h-screen bg-bg-normal text-text-strong"
        style={
          {
            "--main-color": `var(--${schoolData.mainColor})`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
