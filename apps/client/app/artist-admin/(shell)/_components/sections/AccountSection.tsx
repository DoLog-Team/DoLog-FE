"use client";

import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { Title } from "@/components/common/Title/Title";
import { cn } from "@/lib/utils/cn";
import type { MarketingConsents } from "../../_mocks/account";
import { SECTION_TITLE_CLASS } from "../SectionHeader";

const SUB_TITLE_CLASS = "px-0.5 text-body1-bold text-strong min-[721px]:text-head3";
const TEXT_LINK_CLASS =
	"shrink-0 cursor-pointer px-0.5 text-body2 text-lightest underline min-[721px]:text-body1";

interface AccountSectionProps {
	consents: MarketingConsents;
}

export function AccountSection({ consents: initialConsents }: AccountSectionProps) {
	// TODO: 동의 변경 시 동의 일자·서류 버전 저장 API 연결
	const [consents, setConsents] = useState(initialConsents);

	return (
		<section className="pb-6 min-[721px]:pb-7">
			<div className="pt-4 pb-5">
				<Title title="계정 관리" size="head2" margin="none" className={SECTION_TITLE_CLASS} />
			</div>

			<h3 className={SUB_TITLE_CLASS}>마케팅 및 홍보 설정</h3>

			{/* TODO: 보기 — 모달 명세서 29·30·33번 동의 내용 확인 모달 연결 */}
			<div className="mt-4 flex flex-col gap-4 min-[721px]:mt-3 min-[721px]:gap-5">
				<ConsentRow
					label="(선택) 작품·전시 콘텐츠의 서비스 홍보 활용 동의"
					checked={consents.contentPromotion}
					onChange={(checked) => setConsents((prev) => ({ ...prev, contentPromotion: checked }))}
				/>
				<ConsentRow
					label="(선택) 마케팅 목적 개인정보 수집·이용 동의"
					checked={consents.marketing}
					onChange={(checked) => setConsents((prev) => ({ ...prev, marketing: checked }))}
				/>
				{/* 광고성 정보 수신은 마케팅 동의를 따라가며 직접 조작할 수 없음 */}
				<ConsentRow
					label="(선택) 광고성 정보 수신 동의"
					subText="이메일, 카카오톡, 문자로 수신합니다."
					checked={consents.marketing}
					nested
				/>
			</div>

			<h3 className={cn(SUB_TITLE_CLASS, "mt-10")}>계정 탈퇴</h3>
			<p className="mt-2.5 px-0.5 text-body1 text-light">
				계정을 탈퇴하면 프로필, 전시, 작품, 비하인드 등 모든 데이터가 영구적으로 삭제되며 복구할 수
				없습니다.
			</p>
			{/* TODO: 계정 탈퇴 확인 모달 연결 */}
			<button type="button" className={cn(TEXT_LINK_CLASS, "mt-4 text-body1")}>
				계정 탈퇴
			</button>
		</section>
	);
}

interface ConsentRowProps {
	label: string;
	subText?: string;
	checked: boolean;
	// 없으면 비활성 체크박스
	onChange?: (checked: boolean) => void;
	nested?: boolean;
}

function ConsentRow({ label, subText, checked, onChange, nested }: ConsentRowProps) {
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
				onChange={onChange ?? (() => {})}
				disabled={!onChange}
				size="md"
				className="min-w-0 flex-1 items-start text-body2-bold min-[721px]:items-center min-[721px]:text-body1-bold"
				label={
					<span className="flex flex-col">
						{label}
						{/* Figma 상 보조 문구는 모바일에만 있다 */}
						{subText && (
							<span className="text-body2 font-normal text-lighter min-[721px]:hidden">
								{subText}
							</span>
						)}
					</span>
				}
			/>
			<button type="button" className={TEXT_LINK_CLASS}>
				보기
			</button>
		</div>
	);
}
