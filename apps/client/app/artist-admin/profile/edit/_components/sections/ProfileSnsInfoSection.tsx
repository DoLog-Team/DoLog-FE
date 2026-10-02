"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";
import { Select } from "@/components/common/Select/Select";
import type { ArtistProfileForm } from "../../_mocks/profile";

// TODO: 도메인 목록은 임시 값, 디자인·기획 확인 후 확정 예정
const EMAIL_DOMAINS = [
	"gmail.com",
	"naver.com",
	"daum.net",
	"hanmail.net",
	"kakao.com",
	"nate.com",
	"icloud.com",
	"outlook.com",
];
const EMAIL_MAX_LENGTH = 100;

const SNS_MAX_COUNT = 5;
const SNS_NAME_MAX_LENGTH = 50;
const SNS_URL_MAX_LENGTH = 500;

const splitEmail = (email: string) => {
	const [local = "", domain = ""] = email.split("@");
	return { local, domain };
};

interface SnsRow {
	id: number;
	label: string;
	url: string;
}

export interface ProfileSnsInfoSectionProps {
	initialValue: ArtistProfileForm;
}

export const ProfileSnsInfoSection = ({ initialValue }: ProfileSnsInfoSectionProps) => {
	const initialEmail = splitEmail(initialValue.email);
	const [emailLocal, setEmailLocal] = useState(initialEmail.local);
	const [emailDomain, setEmailDomain] = useState<string | undefined>(
		initialEmail.domain || undefined,
	);

	// 직접 입력했거나 저장돼 있던 도메인이 기본 목록에 없으면, select 컴포넌트 옵션에 추가해 다른 옵션처럼 '@도메인' 형태로 보여줌
	const domainOptions = [
		...EMAIL_DOMAINS,
		...(emailDomain && !EMAIL_DOMAINS.includes(emailDomain) ? [emailDomain] : []),
	].map((domain) => ({ label: `@${domain}`, value: domain }));

	// 행 삭제 후에도 key가 겹치지 않도록 id를 계속 증가시킴
	const nextRowId = useRef(0);
	const createRow = (label = "", url = ""): SnsRow => ({ id: nextRowId.current++, label, url });
	const [snsRows, setSnsRows] = useState<SnsRow[]>(() =>
		initialValue.sns.map((sns) => createRow(sns.label, sns.url)),
	);

	const updateRow = (id: number, field: "label" | "url", value: string) => {
		setSnsRows((rows) => rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
	};

	const removeRow = (id: number) => {
		setSnsRows((rows) => rows.filter((row) => row.id !== id));
	};

	const addRow = () => {
		setSnsRows((rows) => (rows.length < SNS_MAX_COUNT ? [...rows, createRow()] : rows));
	};

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 px-0.5 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">SNS 정보</h2>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-9">
				<FormField label="이메일">
					<div className="flex items-start gap-2">
						<Input
							wrapperClassName="min-w-0 flex-1"
							placeholder="placeholder"
							value={emailLocal}
							onChange={(e) => setEmailLocal(e.target.value.slice(0, EMAIL_MAX_LENGTH))}
						/>
						{/* 보연 TODO: 이메일 형식 검증은 허용 규칙 확정 후 추가 */}
						<Select
							className="min-w-0 flex-1"
							options={domainOptions}
							value={emailDomain}
							// 직접 입력할 때 붙인 "@"는 떼고 도메인만 저장
							onChange={(domain) => setEmailDomain(domain.replace(/^@/, ""))}
							placeholder="@gmail.com"
							creatable
						/>
					</div>
				</FormField>

				<FormField label="개인 SNS 주소">
					<div className="flex flex-col">
						<ul className="flex flex-col gap-7">
							{/* 보연 TODO: SNS 주소 URL 형식 검증은 허용 규칙 확정 후 추가 */}
							{snsRows.map((row) => (
								<li key={row.id} className="flex items-stretch gap-2">
									<button
										type="button"
										aria-label="SNS 주소 삭제"
										onClick={() => removeRow(row.id)}
										className="flex w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-fg-lighter"
									>
										<Image src="/icons/close.svg" alt="" width={20} height={20} />
									</button>
									<div className="flex min-w-0 flex-1 flex-wrap items-start gap-x-2 gap-y-3">
										<div className="flex min-w-40 flex-1 flex-col gap-1">
											<label
												htmlFor={`sns-name-${row.id}`}
												className="px-0.5 text-body3 text-light"
											>
												SNS 이름
											</label>
											<Input
												id={`sns-name-${row.id}`}
												placeholder="placeholder"
												value={row.label}
												onChange={(e) =>
													updateRow(row.id, "label", e.target.value.slice(0, SNS_NAME_MAX_LENGTH))
												}
											/>
										</div>
										<div className="flex min-w-75 flex-1 flex-col gap-1">
											<label htmlFor={`sns-url-${row.id}`} className="px-0.5 text-body3 text-light">
												주소
											</label>
											<Input
												id={`sns-url-${row.id}`}
												placeholder="placeholder"
												value={row.url}
												onChange={(e) =>
													updateRow(row.id, "url", e.target.value.slice(0, SNS_URL_MAX_LENGTH))
												}
											/>
										</div>
									</div>
								</li>
							))}
						</ul>

						<div className="pt-5">
							<Button
								variant="assistive"
								size="sm"
								className="gap-0 px-1 text-body2-bold"
								onClick={addRow}
								disabled={snsRows.length >= SNS_MAX_COUNT}
							>
								<span
									aria-hidden
									className="size-5 bg-icon-light mask-[url(/icons/plus.svg)] mask-no-repeat"
								/>
								<span className="px-2">행추가</span>
							</Button>
						</div>
					</div>
				</FormField>
			</div>
		</div>
	);
};
