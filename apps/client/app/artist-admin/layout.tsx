import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { REFRESH_TOKEN_COOKIE, ROLE_COOKIE } from "@/lib/auth/session";
import { withLoginRedirect } from "@/lib/utils/loginHref";
import { ThemeProvider } from "@/providers/theme-providers";

const ARTIST_ROLE = "ARTIST_ADMIN";

// 작가로 로그인하지 않았으면 작가 로그인 화면으로 보낸다 (로그인 후 작가 어드민 홈으로 복귀)
// 별도 proxy 없이 이 화면을 그릴 때 쿠키만 확인하므로 추가 서버 호출이 없다
// 로그인·약관 화면은 (admin-auth) 그룹이라 이 레이아웃을 거치지 않는다
export default async function ArtistAdminRootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const isArtist =
		cookieStore.has(REFRESH_TOKEN_COOKIE) && cookieStore.get(ROLE_COOKIE)?.value === ARTIST_ROLE;
	if (!isArtist) redirect(withLoginRedirect("/artist-admin/login", "/artist-admin"));

	return (
		<ThemeProvider attribute="class" forcedTheme="light" enableColorScheme={true}>
			{children}
		</ThemeProvider>
	);
}
