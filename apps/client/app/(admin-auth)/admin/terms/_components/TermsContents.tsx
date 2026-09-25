import Link from "next/link";

// 개인정보 처리방침 페이지는 외주 작업 중이라 경로 미정
export const PRIVACY_POLICY_HREF = "#";

const TermsTable = ({ rows }: { rows: [string, React.ReactNode][] }) => (
	<table className="w-full border-collapse border border-stroke-lighter text-left">
		<tbody>
			{rows.map(([label, value]) => (
				<tr key={label} className="border-b border-stroke-lighter last:border-b-0">
					<th className="w-24 bg-fg-lighter p-2 align-top font-medium text-strong">{label}</th>
					<td className="p-2 align-top">{value}</td>
				</tr>
			))}
		</tbody>
	</table>
);

const Notice = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col gap-3 border-t border-stroke-lighter pt-4">{children}</div>
);

export const PrivacyTerms = () => (
	<div className="flex flex-col gap-4">
		<TermsTable
			rows={[
				[
					"수집 항목",
					<>
						<strong>작가 회원:</strong> SNS 간편 가입 시 연동 서비스(카카오, 구글)로부터 제공받는
						SNS 인증정보, 이메일, 사용자 성명 / 국문 성명
						<br />
						<strong>이용기관 담당자:</strong> 소속 대학, 학과명, 담당자 성명, 연락처(이메일), 결제
						주체
					</>,
				],
				[
					"수집·이용 목적",
					"회원 식별·인증 및 회원 관리, 전시 아카이빙·작가 페이지 등 서비스 제공, 이용계약 체결·유지, 요금 결제 및 환불 처리, 데이터 반환 및 파기 예정 통지, 문의·고충 처리",
				],
				[
					"보유·이용 기간",
					<>
						<strong>작가 회원:</strong> 회원 탈퇴 시 지체 없이 파기
						<br />
						<strong>이용기관 담당자:</strong> 구독 종료 시 지체 없이 파기. 다만 데이터 반환 및 파기
						예정 통지를 위한 성명·이메일은 구독 종료일로부터 3개월까지 분리 보관 후 파기
						<br />
						관계 법령에 따라 보존 의무가 있는 정보는 해당 기간 동안 분리 보관 후 파기합니다.
					</>,
				],
			]}
		/>
		<p>
			서비스 이용 과정에서 접속 IP 주소, 쿠키, 접속 일시, 서비스 이용 기록, 기기 정보가 자동으로
			생성·수집될 수 있습니다.
		</p>
		<Notice>
			<p>
				※ 위 필수 항목의 수집·이용에 동의하지 않으실 권리가 있습니다. 다만 필수 항목은 회원가입 및
				서비스 제공에 반드시 필요한 정보이므로, 동의하지 않으시는 경우 회원가입이 제한됩니다.
			</p>
			<p>
				그 밖의 개인정보 처리에 관한 자세한 사항은{" "}
				<Link href={PRIVACY_POLICY_HREF} className="font-medium underline">
					[개인정보 처리방침]
				</Link>
				에서 확인하실 수 있습니다.
			</p>
			<p>본 동의서는 2026년 10월 18일부터 적용됩니다.</p>
		</Notice>
	</div>
);

export const PromotionTerms = () => (
	<div className="flex flex-col gap-4">
		<p>
			두록이 운영하는 전시의 정보를 두록 공식 채널에 홍보 목적으로 게시하는 것에 동의하시겠어요?
		</p>
		<p>
			본 동의는 이용기관을 대표하여 담당자가 동의하는 것으로, 개별 작가의 작품에 대한 홍보 활용은
			해당 작가의 별도 동의가 있어야 합니다.
		</p>
		<TermsTable
			rows={[
				[
					"활용 대상",
					"전시명, 전시 기간·장소 등 전시 정보, 전시 포스터, 이용기관 명칭 및 로고, 전시 사이트 화면",
				],
				[
					"활용 목적",
					"두록 공식 인스타그램(@dolog.archive) 등 SNS 채널 및 서비스 소개 자료를 통한 플랫폼 홍보",
				],
				["편집 범위", "게시 형식에 맞춘 크기 조정, 여백 조정, 두록 로고 삽입 등 단순 편집"],
				["활용 기간", "동의 철회 또는 이용계약 종료 시까지"],
			]}
		/>
		<p>
			게시 동의는 언제든 철회하실 수 있으며, 철회 시 두록은 지체 없이 게시를 중단하고 철회
			요청일로부터 7일 이내에 게시물을 삭제한 후 그 결과를 안내드립니다. 다만 두록이 게시를 중단하기
			전에 제3자가 저장·재게시한 콘텐츠에 대하여는 두록이 삭제 조치를 취하기 어려울 수 있습니다.
		</p>
		<Notice>
			<p>※ 본 동의는 선택 사항으로, 동의하지 않으셔도 서비스 이용에 어떠한 제한이 없습니다.</p>
			<p>본 동의서는 2026년 10월 18일부터 적용됩니다.</p>
		</Notice>
	</div>
);

export const MarketingTerms = () => (
	<div className="flex flex-col gap-4">
		<p>
			두록은 이벤트·프로모션 등 마케팅 정보를 안내해 드리기 위해 아래와 같이 개인정보를
			수집·이용합니다.
		</p>
		<TermsTable
			rows={[
				["수집·이용 항목", "이메일 주소, 카카오 계정 연동 정보"],
				["이용 목적", "이벤트·프로모션 등 마케팅 정보 제공, 신규 서비스 및 기능 안내"],
				[
					"보유·이용 기간",
					"동의 철회 또는 회원 탈퇴 시까지. 다만 관계 법령에 따라 보존 의무가 있는 정보는 해당 법령이 정한 기간 동안 분리 보관한 후 파기합니다.",
				],
			]}
		/>
		<p>
			동의는 서비스 내 설정에서 언제든지 철회하실 수 있으며, 철회 시 두록은 철회 요청일로부터 7일
			이내에 처리하고 그 결과를 안내드립니다.
		</p>
		<p>본 동의를 철회하시는 경우 광고성 정보 수신 동의도 함께 철회됩니다.</p>
		<Notice>
			<p>※ 본 항목은 선택 사항으로, 동의를 거부하셔도 서비스 이용에 어떠한 제한이 없습니다.</p>
			<p>본 동의서는 2026년 10월 18일부터 적용됩니다.</p>
		</Notice>
	</div>
);
