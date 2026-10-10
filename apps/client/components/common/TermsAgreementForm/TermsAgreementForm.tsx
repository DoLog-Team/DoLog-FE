"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/common/Button/Button";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { Divider } from "@/components/common/Divider/Divider";
import { Modal } from "@/components/common/Modal/Modal";
import { TermsDocument } from "@/components/common/TermsDocument/TermsDocument";
import { saveTermsAgreement } from "@/lib/api/terms";
import { PRIVACY_POLICY_HREF, SERVICE_TERMS_HREF } from "@/lib/constants/terms";
import { TERMS_DOCUMENTS, TERMS_VERSION } from "@/lib/constants/termsDocuments";

type TermsDocumentKey = keyof typeof TERMS_DOCUMENTS;

// 전시 관리자와 작가가 다른 항목은 별도로 관리한다
// (홍보 활용 동의)
export interface PromotionAgreement {
	title: string;
	description: string;
	document: TermsDocumentKey;
}

interface Agreement {
	key: "ageOver14" | "service" | "privacy" | "promotion" | "marketing";
	title: string;
	description: string;
	required: boolean;
	view: "page" | TermsDocumentKey | null;
}

type AgreementKey = Agreement["key"];

// 동의 항목은 이 배열 하나로 관리 — 초기값·필수 여부 모두 여기서 파생
const buildAgreements = (promotion: PromotionAgreement): Agreement[] => [
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
		title: promotion.title,
		description: promotion.description,
		required: false,
		view: promotion.document,
	},
	{
		key: "marketing",
		title: "(선택) 마케팅 목적 개인정보 수집·이용 동의",
		description: "할인 소식과 신규 기능 안내를 가장 먼저 받아보세요.",
		required: false,
		view: "marketing",
	},
];

const fillAgreed = (checked: boolean): Record<AgreementKey, boolean> => ({
	ageOver14: checked,
	service: checked,
	privacy: checked,
	promotion: checked,
	marketing: checked,
});

type TermsAgreementFormProps = {
	promotion: PromotionAgreement;
	// 저장 성공 후 이동 등 화면별 처리
	onSaved: () => void;
};

export const TermsAgreementForm = ({ promotion, onSaved }: TermsAgreementFormProps) => {
	const agreements = buildAgreements(promotion);
	const [agreed, setAgreed] = useState(() => fillAgreed(false));
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [openedModal, setOpenedModal] = useState<TermsDocumentKey | null>(null);
	const [isFailed, setIsFailed] = useState(false);

	const isAllAgreed = Object.values(agreed).every(Boolean);
	const canSubmit = agreements.every(({ key, required }) => !required || agreed[key]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!canSubmit || isSubmitting) return;

		setIsSubmitting(true);
		const result = await saveTermsAgreement({
			termsVersion: TERMS_VERSION,
			age14OrOverConfirmed: agreed.ageOver14,
			serviceTermsAgreed: agreed.service,
			privacyAgreed: agreed.privacy,
			promotionAgreed: agreed.promotion,
			marketingAgreed: agreed.marketing,
			// 광고성 정보 수신은 마케팅 동의에 종속된다
			adReceiveAgreed: agreed.marketing,
		});

		// 약관 저장 API 연결 후 제거 — 로컬 개발에서 API 가 아직 없을 때만 다음 화면으로 넘어간다
		const isDevWithoutApi =
			process.env.NODE_ENV === "development" && !result.ok && result.reason === "NO_ENDPOINT";
		if (result.ok || isDevWithoutApi) {
			onSaved();
			return;
		}

		setIsSubmitting(false);
		setIsFailed(true);
	};

	const modal = openedModal ? TERMS_DOCUMENTS[openedModal] : null;

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

					{agreements.map(({ key, title, description, view }) => (
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
							{/* 동의 중인 체크 상태가 사라지지 않도록 새 탭으로 연다 */}
							{view === "page" && (
								<a
									href={SERVICE_TERMS_HREF}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${title} 보기`}
									className="shrink-0"
								>
									<ViewLabel />
								</a>
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
					<a
						href={PRIVACY_POLICY_HREF}
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({ variant: "assistive", size: "lg", className: "mb-5" })}
					>
						개인정보 처리방침 전문 보기
					</a>
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
