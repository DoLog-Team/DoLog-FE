// GET /accounts/me
export interface MyAccount {
	accountId: string;
	email: string | null;
	role: string;
	accountStatus: string;
	// 전시 어드민만 값이 있다
	exhibitionId: string | null;
	// 작가 어드민만 값이 있다
	artistId: string | null;
}
