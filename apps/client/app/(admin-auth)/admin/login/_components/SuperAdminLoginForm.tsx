"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { loginExhibitionAdmin } from "@/lib/api/auth";
import { MOCK_LOGIN_RESULTS } from "../_mocks/auth";

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 10 * 60 * 1000;

const MESSAGE = {
	mismatch: "로그인 코드가 일치하지 않아요.",
	locked: "로그인 코드를 5회 잘못 입력하여 로그인이 10분간 일시적으로 제한되었어요.",
} as const;

// 로그인 API 연결 후 mock 제거 — 로컬 개발에서 API 가 응답하지 않을 때만 목 코드로 대체
const getLoginResult = async (code: string) => {
	const result = await loginExhibitionAdmin(code);
	if (process.env.NODE_ENV !== "development" || result.ok || result.reason !== "ERROR")
		return result;
	return (
		MOCK_LOGIN_RESULTS[code] ?? {
			ok: false as const,
			reason: "INVALID_CODE" as const,
		}
	);
};

type FailureModal = "expired" | "failed" | null;

export const SuperAdminLoginForm = () => {
	const router = useRouter();

	const [code, setCode] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [attempts, setAttempts] = useState(0);
	const [lockedUntil, setLockedUntil] = useState<number | null>(null);
	const [failureModal, setFailureModal] = useState<FailureModal>(null);

	const isLocked = lockedUntil !== null;

	// 제한 시간이 끝나면 입력을 다시 열어준다
	useEffect(() => {
		if (lockedUntil === null) return;

		const remaining = lockedUntil - Date.now();
		const timer = setTimeout(
			() => {
				setLockedUntil(null);
				setAttempts(0);
				setErrorMessage("");
			},
			Math.max(remaining, 0),
		);

		return () => clearTimeout(timer);
	}, [lockedUntil]);

	const lock = () => {
		setLockedUntil(Date.now() + LOCK_DURATION_MS);
		setErrorMessage(MESSAGE.locked);
	};

	const handleMismatch = () => {
		const next = attempts + 1;
		setAttempts(next);

		if (next >= MAX_ATTEMPTS) {
			lock();
			return;
		}
		setErrorMessage(MESSAGE.mismatch);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!code || isSubmitting || isLocked) return;

		setIsSubmitting(true);
		setErrorMessage("");

		const result = await getLoginResult(code);

		setIsSubmitting(false);

		if (result.ok) {
			router.replace(result.data.is_first_login ? "/admin/terms" : "/admin");
			return;
		}

		switch (result.reason) {
			case "INVALID_CODE":
				handleMismatch();
				break;
			case "TOO_MANY_ATTEMPTS":
				lock();
				break;
			case "EXPIRED":
				setFailureModal("expired");
				break;
			default:
				setFailureModal("failed");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex w-full max-w-100 flex-col gap-4">
				<Input
					value={code}
					onChange={(event) => setCode(event.target.value)}
					placeholder="로그인 코드를 입력해주세요."
					disabled={isLocked}
					error={Boolean(errorMessage)}
					errorMessage={errorMessage}
					autoComplete="off"
					aria-label="로그인 코드"
					className="h-12"
				/>

				<Button
					type="submit"
					size="lg"
					className="w-full"
					disabled={!code || isSubmitting || isLocked}
				>
					{isSubmitting ? (
						<span className="flex items-center gap-2">
							<span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-b-transparent" />
							로그인 중
						</span>
					) : (
						"로그인하기"
					)}
				</Button>
			</form>

			<Modal
				open={failureModal === "expired"}
				onOpenChange={(open) => !open && setFailureModal(null)}
				title="사용 기간이 만료되었어요."
				description="연장 희망 시, 두록에 문의해주세요."
				showCloseButton
				actions={[
					{
						text: "확인",
						variant: "assistive",
						onClick: () => setFailureModal(null),
					},
				]}
			/>

			<Modal
				open={failureModal === "failed"}
				onOpenChange={(open) => !open && setFailureModal(null)}
				title="로그인에 실패했어요."
				description={"로그인에 실패했어요.\n잠시 뒤 다시 시도해주세요."}
				showCloseButton
				actions={[
					{
						text: "확인",
						variant: "assistive",
						onClick: () => setFailureModal(null),
					},
				]}
			/>
		</>
	);
};
