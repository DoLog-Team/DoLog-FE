"use client";

import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";
import { Select } from "@/components/common/Select/Select";
import type { ArtistProfileForm, ArtistSnsLink } from "../../_types";
import {
	INVALID_MESSAGE,
	isEmailInvalid,
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
	const isEmailError = showErrors && isEmailInvalid(emailLocal, emailDomain);

	// 직접 입력했거나 저장돼 있던 도메인이 기본 목록에 없으면, select 컴포넌트 옵션에 추가해 다른 옵션처럼 '@도메인' 형태로 보여줌
	const domainOptions = [
		...EMAIL_DOMAINS,
		...(emailDomain && !EMAIL_DOMAINS.includes(emailDomain) ? [emailDomain] : []),
	].map((domain) => ({ label: `@${domain}`, value: domain }));

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
							error={isEmailError}
							errorMessage={isEmailError ? INVALID_MESSAGE : undefined}
						/>
						<Select
							className="min-w-0 flex-1"
							options={domainOptions}
							value={emailDomain || undefined}
							// 직접 입력할 때 붙인 "@"는 떼고 도메인만 저장
							onChange={(domain) => onChange({ emailDomain: domain.replace(/^@/, "") })}
							placeholder="@gmail.com"
							creatable
						/>
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
