import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { REFRESH_TOKEN_COOKIE, ROLE_COOKIE } from "@/lib/auth/session";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";

const EXHIBITION_ADMIN_ROLE = "EXHIBITION_ADMIN";

// 작가 어드민 가드(artist-admin/layout.tsx)와 같이 쿠키만 확인한다
export async function requireExhibitionAdmin() {
	const cookieStore = await cookies();
	const isExhibitionAdmin =
		cookieStore.has(REFRESH_TOKEN_COOKIE) &&
		cookieStore.get(ROLE_COOKIE)?.value === EXHIBITION_ADMIN_ROLE;
	if (!isExhibitionAdmin) redirect(ADMIN_LOGIN_HREF);
}
