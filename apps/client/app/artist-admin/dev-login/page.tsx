"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";
import { setTokens } from "@/lib/api/authToken";
import { apiClient } from "@/lib/api/instance";

// 로그인 UI(#168) 완성 전까지, 로컬 백엔드에 작가 세션을 발급받기 위한 임시 개발용 페이지.
// DOLOG_ADMIN 계정으로 로그인한 뒤 그 토큰으로 테스트 작가(ARTIST_1/ARTIST_2) 세션을 다시 발급받는다.
const FIXTURES = ["ARTIST_1", "ARTIST_2"] as const;

interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

export default function DevLoginPage() {
	if (process.env.NODE_ENV !== "development") notFound();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
	const [message, setMessage] = useState("");

	const handleLogin = async (fixture: (typeof FIXTURES)[number]) => {
		setStatus("loading");
		setMessage("");
		try {
			const admin = await apiClient<LoginResponse>("/auth/login", {
				method: "POST",
				body: JSON.stringify({ email, password }),
			});
			setTokens(admin.accessToken, admin.refreshToken);

			const artist = await apiClient<LoginResponse>("/auth/dev/artist-login", {
				method: "POST",
				body: JSON.stringify({ fixture }),
			});
			setTokens(artist.accessToken, artist.refreshToken);

			setStatus("done");
			setMessage(`${fixture} 세션 발급 완료. 이제 /artist-admin 에서 테스트할 수 있어요.`);
		} catch (error) {
			setStatus("error");
			setMessage(error instanceof Error ? error.message : "로그인에 실패했어요.");
		}
	};

	return (
		<div className="mx-auto flex max-w-100 flex-col gap-4 p-8">
			<h1 className="text-head2 text-strong">개발용 작가 로그인</h1>
			<p className="text-body2 text-lighter">
				로컬 백엔드의 DOLOG_ADMIN 계정으로 로그인해 테스트 작가 세션을 발급받아요.
			</p>

			<Input placeholder="admin 이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
			<Input
				placeholder="admin 비밀번호"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<div className="flex gap-2">
				{FIXTURES.map((fixture) => (
					<Button
						key={fixture}
						type="button"
						disabled={!email || !password || status === "loading"}
						onClick={() => handleLogin(fixture)}
					>
						{fixture}로 로그인
					</Button>
				))}
			</div>

			{message && (
				<p className={`text-body2 ${status === "error" ? "text-error" : "text-lighter"}`}>
					{message}
				</p>
			)}
		</div>
	);
}
