"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/common/Button/Button";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { Divider } from "@/components/common/Divider/Divider";
import { Modal } from "@/components/common/Modal/Modal";
import { TermsDocument } from "@/components/common/TermsDocument/TermsDocument";
import { saveTermsAgreement } from "@/lib/api/terms";
import { PRIVACY_POLICY_HREF, SERVICE_TERMS_HREF } from "@/lib/constants/terms";
import { MOCK_SUPER_ADMIN_TERMS } from "../_mocks/terms";

type TermsModalKey = keyof typeof MOCK_SUPER_ADMIN_TERMS;

const TERMS_VERSION = "ver1";

// 동의 항목은 이 배열 하나로 관리 — 키 타입·초기값·필수 여부 모두 여기서 파생
const AGREEMENTS = [
	{
		key: "ageOver14",
		title: "(필수) 만 14세 이상입니다",
		description: "두록은 만 14세 미만 아동의 회원가입을 받지 않습니다.",
		required: true,
		view: null,
	},
	{
		key: "service",
		title: "(필수) 서비스 이용 약관 동의",
		description: "두록 서비스 이용 조건과 회원의 권리·의무에 관한 사항입니다.",
		required: true,
		view: "page",
	},
	{
		key: "privacy",
		title: "(필수) 개인정보 수집 및 이용 동의",
		description: "회원 관리와 서비스 제공을 위해 필요한 최소한의 정보를 수집합니다.",
		required: true,
		view: "privacy",
	},
	{
		key: "promotion",
		title: "(선택) 전시 정보의 서비스 홍보 활용 동의",
		description: "작품이 두록 공식 SNS에 소개될 수 있습니다.",
		required: false,
		view: "promotion",
	},
	{
		key: "marketing",
		title: "(선택) 마케팅 목적 개인정보 수집·이용 동의",
		description: "할인 소식과 신규 기능 안내를 가장 먼저 받아보세요.",
		required: false,
		view: "marketing",
	},
] as const satisfies readonly {
	key: string;
	title: string;
	description: string;
	required: boolean;
	view: "page" | TermsModalKey | null;
}[];

type AgreementKey = (typeof AGREEMENTS)[number]["key"];

const fillAgreed = (checked: boolean) =>
	Object.fromEntries(AGREEMENTS.map(({ key }) => [key, checked])) as Record<AgreementKey, boolean>;

export const SuperAdminTermsForm = () => {
	const router = useRouter();
	const [agreed, setAgreed] = useState(() => fillAgreed(false));
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [openedModal, setOpenedModal] = useState<TermsModalKey | null>(null);
	const [isFailed, setIsFailed] = useState(false);

	const isAllAgreed = Object.values(agreed).every(Boolean);
	const canSubmit = AGREEMENTS.every(({ key, required }) => !required || agreed[key]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!canSubmit || isSubmitting) return;

		setIsSubmitting(true);
		const result = await saveTermsAgreement({
			age_over_14: agreed.ageOver14,
			service_terms: agreed.service,
			privacy_collection: agreed.privacy,
			exhibition_promotion: agreed.promotion,
			marketing: agreed.marketing,
			advertising: agreed.marketing,
			terms_version: TERMS_VERSION,
		});

		// 약관 저장 API 연결 후 제거 — 로컬 개발에서 API 가 아직 없을 때만 다음 화면으로 넘어간다
		const isDevWithoutApi =
			process.env.NODE_ENV === "development" && !result.ok && result.reason === "NO_ENDPOINT";
		if (result.ok || isDevWithoutApi) {
			router.replace("/admin");
			return;
		}

		setIsSubmitting(false);
		setIsFailed(true);
	};

	const modal = openedModal ? MOCK_SUPER_ADMIN_TERMS[openedModal] : null;

	return (
		<>
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-12.5">
				<div className="flex flex-col gap-5">
					<Checkbox
						checked={isAllAgreed}
						onChange={(checked) => setAgreed(fillAgreed(checked))}
						label={<span className="text-body1-bold text-strong">전체 동의</span>}
					/>

					<Divider spacing="none" thickness="thin" fullBleed={false} />

					{AGREEMENTS.map(({ key, title, description, view }) => (
						<div key={key} className="flex items-start gap-2.5">
							<Checkbox
								checked={agreed[key]}
								onChange={(checked) => setAgreed((prev) => ({ ...prev, [key]: checked }))}
								className="flex-1 items-start"
								label={
									<span className="flex flex-col gap-1">
										<span className="text-body1-bold text-light">{title}</span>
										<span className="hidden text-body1 text-lighter min-[721px]:block">
											{description}
										</span>
									</span>
								}
							/>
							{view === "page" && (
								<Link href={SERVICE_TERMS_HREF} aria-label={`${title} 보기`} className="shrink-0">
									<ViewLabel />
								</Link>
							)}
							{view && view !== "page" && (
								<button
									type="button"
									onClick={() => setOpenedModal(view)}
									aria-label={`${title} 보기`}
									className="shrink-0 cursor-pointer"
								>
									<ViewLabel />
								</button>
							)}
						</div>
					))}

					<div className="flex items-start gap-2.5">
						<Image src="/icons/enter.svg" alt="" width={24} height={24} />
						<Checkbox
							checked={agreed.marketing}
							onChange={() => {}}
							disabled
							className="flex-1 items-start"
							label={
								<span className="flex flex-col gap-1">
									<span className="text-body1-bold text-lighter">(선택) 광고성 정보 수신 동의</span>
									<span className="hidden text-body1 text-lighter min-[721px]:block">
										이메일 및 카카오톡 채널 알림으로
										<br />
										이벤트·프로모션 등 광고성 정보를 받습니다.
									</span>
								</span>
							}
						/>
					</div>
				</div>

				<Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isSubmitting}>
					{isSubmitting ? (
						<span className="flex items-center gap-2">
							<span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-b-transparent" />
							저장 중
						</span>
					) : (
						"다음"
					)}
				</Button>
			</form>

			<Modal
				open={Boolean(modal)}
				onOpenChange={(open) => !open && setOpenedModal(null)}
				title={modal?.title ?? ""}
				showCloseButton
				className="min-[721px]:max-w-150 min-[721px]:p-8"
				actions={[{ text: "확인", variant: "primary", onClick: () => setOpenedModal(null) }]}
			>
				{openedModal === "privacy" && (
					<Link
						href={PRIVACY_POLICY_HREF}
						className={buttonVariants({ variant: "assistive", size: "lg", className: "mb-5" })}
					>
						개인정보 처리방침 전문 보기
					</Link>
				)}
				<div className="max-h-[50dvh] overflow-y-auto break-keep text-body2 text-light">
					{modal && <TermsDocument blocks={modal.blocks} />}
				</div>
			</Modal>

			<Modal
				open={isFailed}
				onOpenChange={(open) => !open && setIsFailed(false)}
				title="저장에 실패했어요."
				description="잠시 뒤 다시 시도해주세요."
				showCloseButton
				actions={[{ text: "확인", variant: "assistive", onClick: () => setIsFailed(false) }]}
			/>
		</>
	);
};

const ViewLabel = () => (
	<>
		<span className="hidden text-body1 text-lightest underline min-[721px]:inline">보기</span>
		<Image
			src="/icons/arrowRight.svg"
			alt=""
			width={20}
			height={20}
			className="mt-0.5 min-[721px]:hidden"
		/>
	</>
);
