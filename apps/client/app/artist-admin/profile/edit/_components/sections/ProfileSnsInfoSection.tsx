"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";
import { Select } from "@/components/common/Select/Select";
import type { ArtistProfileForm, ArtistSnsLink } from "../../_types";
import {
	INVALID_MESSAGE,
	isEmailDomainInvalid,
	isEmailDomainTypingInvalid,
	isEmailLocalInvalid,
	isSnsLabelInvalid,
	isSnsUrlInvalid,
} from "../profileValidation";

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
const SNS_URL_MAX_LENGTH = 255;

export interface ProfileSnsInfoSectionProps {
	value: ArtistProfileForm;
	onChange: (patch: Partial<ArtistProfileForm>) => void;
	// 이메일·URL 은 입력 도중 형식이 맞지 않으므로 저장을 시도한 뒤에 오류를 보여준다
	showErrors: boolean;
}

export const ProfileSnsInfoSection = ({
	value,
	onChange,
	showErrors,
}: ProfileSnsInfoSectionProps) => {
	const { emailLocal, emailDomain, sns: snsRows } = value;
	// 오류는 잘못 적은 칸 밑에 띄운다 — 도메인에 영어·점 외 글자가 들어가면 저장 전이라도 바로 알려준다
	const isEmailLocalError = showErrors && isEmailLocalInvalid(emailLocal);
	const isEmailDomainError =
		isEmailDomainTypingInvalid(emailDomain) ||
		(showErrors && isEmailDomainInvalid(emailLocal, emailDomain));

	// 기획(110400-0202-04): 목록에서 고르는 게 기본이고, [직접 입력]을 눌렀을 때만 도메인을 직접 적는다
	// 직접 입력칸 밖을 누르면 다시 목록으로 돌아가고, 적은 도메인은 목록에 선택된 값으로 보인다
	const [isCustomDomain, setIsCustomDomain] = useState(false);
	const isListedDomain = EMAIL_DOMAINS.includes(emailDomain);
	const domainOptions = [
		...EMAIL_DOMAINS,
		...(emailDomain && !isListedDomain ? [emailDomain] : []),
	].map((domain) => ({ label: domain, value: domain }));

	const setRows = (rows: ArtistSnsLink[]) => onChange({ sns: rows });

	const updateRow = (id: string, field: "label" | "url", text: string) => {
		setRows(snsRows.map((row) => (row.id === id ? { ...row, [field]: text } : row)));
	};

	const removeRow = (id: string) => {
		setRows(snsRows.filter((row) => row.id !== id));
	};

	// 새 행은 저장 전까지 snsId 가 없어 화면용 key 를 따로 만든다
	const addRow = () => {
		if (snsRows.length >= SNS_MAX_COUNT) return;
		setRows([...snsRows, { id: crypto.randomUUID(), snsId: null, label: "", url: "" }]);
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
							onChange={(e) => onChange({ emailLocal: e.target.value.slice(0, EMAIL_MAX_LENGTH) })}
							error={isEmailLocalError}
							errorMessage={isEmailLocalError ? INVALID_MESSAGE : undefined}
						/>
						{/* "@"는 입력창 밖에 고정 — 지우거나 따로 적을 일이 없게 한다 */}
						<span aria-hidden className="flex h-11 shrink-0 items-center text-body1 text-light">
							@
						</span>
						{isCustomDomain ? (
							// 직접 입력 중에도 목록을 같이 열어 둬서, 칸을 비우지 않고 바로 목록에서 고를 수 있게 한다
							<div className="relative min-w-0 flex-1">
								<Input
									placeholder="example.com"
									value={emailDomain}
									onChange={(e) =>
										onChange({ emailDomain: e.target.value.slice(0, EMAIL_MAX_LENGTH) })
									}
									onBlur={() => setIsCustomDomain(false)}
									// 다시 편집하러 들어왔을 때 커서를 글 끝에 둔다
									onFocus={(e) => {
										const end = e.currentTarget.value.length;
										e.currentTarget.setSelectionRange(end, end);
									}}
									error={isEmailDomainError}
									errorMessage={isEmailDomainError ? INVALID_MESSAGE : undefined}
									autoFocus
								/>
								{/* 목록 모양은 Select 드롭다운과 같게 */}
								<ul className="absolute top-12 z-10 max-h-60 w-full divide-y divide-stroke-lighter overflow-auto rounded-lg border border-stroke-lighter bg-bg-normal shadow-lg">
									{EMAIL_DOMAINS.map((domain) => (
										<li key={domain}>
											<button
												type="button"
												// 누르는 순간 입력칸 blur 가 먼저 일어나 목록이 사라지지 않게 막는다
												onMouseDown={(e) => e.preventDefault()}
												onClick={() => {
													onChange({ emailDomain: domain });
													setIsCustomDomain(false);
												}}
												className="w-full px-3 py-2 text-left text-body2 text-strong"
											>
												{domain}
											</button>
										</li>
									))}
								</ul>
							</div>
						) : (
							// Select 는 오류 문구 자리가 없어 Input 과 같은 모양으로 밑에 붙인다
							// 직접 적은 도메인이 선택돼 있으면 칸을 눌렀을 때 목록 대신 그 값을 그대로 고치게 한다
							// (그때도 목록이 같이 열려 있어 바로 다른 도메인을 고를 수 있다)
							// biome-ignore lint/a11y/noStaticElementInteractions: 안쪽 Select 입력칸의 포커스를 받아 모드만 바꾼다
							// biome-ignore lint/a11y/noNoninteractiveElementInteractions: 위와 같음
							<div
								className="flex min-w-0 flex-1 flex-col gap-1"
								onFocus={() => {
									if (emailDomain && !isListedDomain) setIsCustomDomain(true);
								}}
							>
								<Select
									options={domainOptions}
									value={emailDomain || undefined}
									onChange={(domain) => onChange({ emailDomain: domain })}
									placeholder="gmail.com"
									error={isEmailDomainError}
									actionLabel="직접 입력"
									onActionClick={() => {
										setIsCustomDomain(true);
										// 직접 적었던 도메인은 이어서 고칠 수 있게 남기고, 목록에서 고른 값이면 비운다
										if (isListedDomain) onChange({ emailDomain: "" });
									}}
								/>
								{isEmailDomainError && (
									<span className="pl-0.5 text-body3 text-error">{INVALID_MESSAGE}</span>
								)}
							</div>
						)}
					</div>
				</FormField>

				<FormField label="개인 SNS 주소">
					<div className="flex flex-col">
						<ul className="flex flex-col gap-7">
							{snsRows.map((row) => {
								const isLabelError = showErrors && isSnsLabelInvalid(row);
								const isUrlError = showErrors && isSnsUrlInvalid(row);
								return (
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
													error={isLabelError}
													errorMessage={isLabelError ? INVALID_MESSAGE : undefined}
												/>
											</div>
											<div className="flex min-w-75 flex-1 flex-col gap-1">
												<label
													htmlFor={`sns-url-${row.id}`}
													className="px-0.5 text-body3 text-light"
												>
													주소
												</label>
												<Input
													id={`sns-url-${row.id}`}
													placeholder="placeholder"
													value={row.url}
													onChange={(e) =>
														updateRow(row.id, "url", e.target.value.slice(0, SNS_URL_MAX_LENGTH))
													}
													error={isUrlError}
													errorMessage={isUrlError ? INVALID_MESSAGE : undefined}
												/>
											</div>
										</div>
									</li>
								);
							})}
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
