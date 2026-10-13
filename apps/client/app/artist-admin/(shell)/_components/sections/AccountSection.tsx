"use client";

import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { Modal } from "@/components/common/Modal/Modal";
import { TermsDocument } from "@/components/common/TermsDocument/TermsDocument";
import { Title } from "@/components/common/Title/Title";
import { saveTermsAgreement } from "@/lib/api/terms";
import { TERMS_DOCUMENTS } from "@/lib/constants/termsDocuments";
import { cn } from "@/lib/utils/cn";
import type { MyTermsAgreement } from "../../_types";
import { AccountWithdrawModal } from "../modals/AccountWithdrawModal";
import { SECTION_TITLE_CLASS } from "../SectionHeader";

const SUB_TITLE_CLASS = "px-0.5 text-body1-bold text-strong min-[721px]:text-head3";
const TEXT_LINK_CLASS =
	"shrink-0 cursor-pointer px-0.5 text-body2 text-lightest underline min-[721px]:text-body1";

type ViewableDocument = "contentPromotion" | "marketing";

interface AccountSectionProps {
	// 동의 내역이 없으면 null — 선택 항목은 모두 미동의로 보여준다
	// TODO : 백에 문의중 (답변 확인 후 수정 필요)
	agreement: MyTermsAgreement | null;
}

export function AccountSection({ agreement: initialAgreement }: AccountSectionProps) {
	const [agreement, setAgreement] = useState(initialAgreement);
	const [isSaving, setIsSaving] = useState(false);
	const [isSaveFailed, setIsSaveFailed] = useState(false);
	const [openedDocument, setOpenedDocument] = useState<ViewableDocument | null>(null);
	const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

	const promotionAgreed = agreement?.promotionAgreed ?? false;
	const marketingAgreed = agreement?.marketingAgreed ?? false;

	// 동의를 바꾸면 바로 저장 — 동의 일자·서류 버전은 서버가 기록하고, 필수 항목은 기존 값 그대로 다시 보낸다
	const updateConsent = async (
		change: Pick<MyTermsAgreement, "promotionAgreed" | "marketingAgreed">,
	) => {
		// 약관 동의를 거치지 않은 계정은 필수 항목이 없어 저장할 수 없다
		if (!agreement || isSaving) return;
		const next = { ...agreement, ...change };

		setAgreement(next);
		setIsSaving(true);
		const result = await saveTermsAgreement({
			termsVersion: next.termsVersion,
			age14OrOverConfirmed: next.age14OrOverConfirmed,
			serviceTermsAgreed: next.serviceTermsAgreed,
			privacyAgreed: next.privacyAgreed,
			promotionAgreed: next.promotionAgreed,
			marketingAgreed: next.marketingAgreed,
			// 광고성 정보 수신은 마케팅 동의에 종속된다
			adReceiveAgreed: next.marketingAgreed,
		});
		setIsSaving(false);

		if (!result.ok) {
			setAgreement(agreement);
			setIsSaveFailed(true);
		}
	};

	const document = openedDocument ? TERMS_DOCUMENTS[openedDocument] : null;

	return (
		<section className="pb-6 min-[721px]:pb-7">
			<div className="pt-4 pb-5">
				<Title title="계정 관리" size="head2" margin="none" className={SECTION_TITLE_CLASS} />
			</div>

			<h3 className={SUB_TITLE_CLASS}>마케팅 및 홍보 설정</h3>

			<div className="mt-4 flex flex-col gap-4 min-[721px]:mt-3 min-[721px]:gap-5">
				<ConsentRow
					label="(선택) 작품·전시 콘텐츠의 서비스 홍보 활용 동의"
					checked={promotionAgreed}
					onChange={(checked) => updateConsent({ promotionAgreed: checked, marketingAgreed })}
					onView={() => setOpenedDocument("contentPromotion")}
				/>
				<ConsentRow
					label="(선택) 마케팅 목적 개인정보 수집·이용 동의"
					checked={marketingAgreed}
					onChange={(checked) => updateConsent({ promotionAgreed, marketingAgreed: checked })}
					onView={() => setOpenedDocument("marketing")}
				/>
				{/* 광고성 정보 수신은 마케팅 동의를 따라가며 직접 조작할 수 없음 */}
				{/* TODO: 광고성 정보 수신 동의 전문(모달 33번)은 노션 원문이 없어 아직 연결 못 함 */}
				<ConsentRow
					label="(선택) 광고성 정보 수신 동의"
					subText="이메일, 카카오톡, 문자로 수신합니다."
					checked={marketingAgreed}
					nested
				/>
			</div>

			<Modal
				open={Boolean(document)}
				onOpenChange={(open) => !open && setOpenedDocument(null)}
				title={document?.title ?? ""}
				showCloseButton
				className="min-[721px]:max-w-150 min-[721px]:p-8"
				actions={[{ text: "확인", variant: "primary", onClick: () => setOpenedDocument(null) }]}
			>
				<div className="max-h-[50dvh] overflow-y-auto break-keep text-body2 text-light">
					{document && <TermsDocument blocks={document.blocks} />}
				</div>
			</Modal>

			<Modal
				open={isSaveFailed}
				onOpenChange={(open) => !open && setIsSaveFailed(false)}
				title="저장에 실패했어요."
				description="잠시 뒤 다시 시도해주세요."
				showCloseButton
				actions={[{ text: "확인", variant: "assistive", onClick: () => setIsSaveFailed(false) }]}
			/>

			<h3 className={cn(SUB_TITLE_CLASS, "mt-10")}>계정 탈퇴</h3>
			<p className="mt-2.5 px-0.5 text-body1 text-light">
				계정을 탈퇴하면 프로필, 전시, 작품, 비하인드 등 모든 데이터가 영구적으로 삭제되며 복구할 수
				없습니다.
			</p>
			<button
				type="button"
				className={cn(TEXT_LINK_CLASS, "mt-4 text-body1")}
				onClick={() => setIsWithdrawModalOpen(true)}
			>
				계정 탈퇴
			</button>

			<AccountWithdrawModal open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen} />
		</section>
	);
}

interface ConsentRowProps {
	label: string;
	subText?: string;
	checked: boolean;
	// 없으면 비활성 체크박스
	onChange?: (checked: boolean) => void;
	// 동의 전문 보기 — 없으면 보기 버튼이 동작하지 않음
	onView?: () => void;
	nested?: boolean;
}

function ConsentRow({ label, subText, checked, onChange, onView, nested }: ConsentRowProps) {
	return (
		<div className="flex items-center gap-2.5">
			{nested && (
				<Image
					src="/icons/enter.svg"
					alt=""
					width={24}
					height={24}
					className="size-5 shrink-0 min-[721px]:size-6"
				/>
			)}
			<Checkbox
				checked={checked}
				onChange={onChange}
				disabled={!onChange}
				size="md"
				className="min-w-0 flex-1 items-start text-body2-bold min-[721px]:items-center min-[721px]:text-body1-bold"
				label={
					<span className="flex flex-col">
						{label}
						{subText && (
							<span className="text-body2 font-normal text-lighter min-[721px]:hidden">
								{subText}
							</span>
						)}
					</span>
				}
			/>
			<button type="button" className={TEXT_LINK_CLASS} onClick={onView}>
				보기
			</button>
		</div>
	);
}
