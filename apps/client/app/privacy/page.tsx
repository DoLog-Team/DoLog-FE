import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "개인정보처리방침 | 두록(Dolog)",
	description: "두록(dolog)의 개인정보처리방침입니다.",
	alternates: { canonical: "https://dolog.kr/privacy" },
};

type TableProps = {
	head: string[];
	rows: React.ReactNode[][];
};

function Table({ head, rows }: TableProps) {
	return (
		<div className="my-4 overflow-x-auto">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr>
						{head.map((h) => (
							<th key={h} className="border border-black/10 bg-black/5 px-3 py-2 text-left font-medium">
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: 정적 데이터
						<tr key={i}>
							{row.map((cell, j) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: 정적 데이터
								<td key={j} className="border border-black/10 px-3 py-2 align-top">
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="mt-10">
			<h2 className="text-xl font-semibold">{title}</h2>
			<div className="mt-3 flex flex-col gap-2">{children}</div>
		</section>
	);
}

function List({ items }: { items: React.ReactNode[] }) {
	return (
		<ul className="list-disc pl-6 flex flex-col gap-1">
			{items.map((item, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: 정적 데이터
				<li key={i}>{item}</li>
			))}
		</ul>
	);
}

export default function PrivacyPage() {
	return (
		<article className="mx-auto w-full max-w-[900px] px-5 py-12 leading-relaxed text-light">
			<h1 className="text-3xl font-bold text-strong">개인정보처리방침</h1>

			<p className="mt-6">
				‘두록(dolog)’(이하 “두록”)은「개인정보 보호법」제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한
				고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립 및 공개합니다.
			</p>
			<p className="mt-2">본 방침은 2026년 11월 01일부터 적용됩니다.</p>

			<Section title="제 1조 개인정보의 처리 목적">
				<p>
					두록은 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리하는 개인정보는 다음 목적 이외의 용도로는
					이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」제18조에 따라 별도의 동의를 받는 등 필요한
					조치를 이행합니다.
				</p>
				<List
					items={[
						"회원 가입 및 관리: 회원제 서비스 이용에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지",
						"서비스 제공: 전시 아카이빙, 작가·작품 페이지 제공, 작가노트 등 콘텐츠 게시 및 노출",
						"고충 처리 및 문의 응대: 문의사항 확인, 처리결과 통보",
						"마케팅 활용 동의",
						"제 3자 동의",
					]}
				/>
			</Section>

			<Section title="제 2조 처리하는 개인정보의 항목">
				<Table
					head={["수집하는 개인정보 항목", "수집 및 이용 목적"]}
					rows={[
						[
							<>
								<strong>SNS 계정 간편 회원가입·로그인 시 수집하는 개인정보</strong>
								<br />
								SNS 동의를 통해 수집된 SNS 인증정보, 이메일, 사용자 성명
								<br />
								<br />
								<strong>작가 정보 입력</strong>
								<br />
								국문 성명, 영문 성명, 작가 한줄소개, 대표 이미지, 이메일, 개인 SNS 주소, 소통 주소(구매하기 링크)
								<br />
								<br />
								<strong>서비스 이용 과정에서 자동으로 생성/수집되는 정보</strong>
								<br />
								접속 IP 주소, 쿠키, 접속 일시, 이용 시간, 서비스 이용 기록, 기기 정보(OS·브라우저 종류 등)
							</>,
							<>
								• 회원 관리를 위해 개인정보를 이용합니다.
								<br />• 이용자 보호 및 안전한 서비스 이용환경 구축을 위하여 개인정보를 이용합니다.
								<br />• 서비스 제공과 운영을 위하여 개인정보를 이용합니다.
								<br />• 유료 서비스 제공을 위하여 개인정보를 이용합니다.
								<br />• 서비스 개선, 기술 개발, 신규 서비스 요소의 발굴, 서비스 경험 향상을 위하여 개인정보를 이용합니다.
								<br />• 콘텐츠와 광고를 포함한 맞춤 서비스 제공을 위하여 개인정보를 이용합니다.
							</>,
						],
					]}
				/>

				<h3 className="mt-4 text-lg font-semibold">2-1. SNS 계정 간편 회원가입·로그인 시 수집하는 개인정보</h3>
				<p>
					두록은 SNS 계정을 통한 간편 회원가입·로그인 시, 이용자가 해당 SNS 서비스에서 동의한 범위 내에서 아래 정보를
					연동 서비스로부터 제공받습니다.
				</p>
				<Table
					head={["연동 서비스", "제공받는 항목"]}
					rows={[
						["카카오", "SNS 동의를 통해 수집된 SNS 인증정보, 이메일, 사용자 성명"],
						["구글", "SNS 동의를 통해 수집된 SNS 인증정보, 이메일, 사용자 성명"],
					]}
				/>

				<h3 className="mt-4 text-lg font-semibold">2-2. 작가 정보 입력</h3>
				<List
					items={[
						"필수: 국문 성명",
						"선택: 영문 성명, 작가 한줄소개, 대표 이미지, 이메일, 개인 SNS 주소, 소통 주소(구매하기 링크)",
						"기타: 전시 가입 시, 전시회 이름, 전시 기간, 전시회 주최 기관 등 전시회 정보도 함께 수집",
					]}
				/>

				<h3 className="mt-4 text-lg font-semibold">2-3. 작가가 게시하는 콘텐츠</h3>
				<List
					items={[
						"작품 이미지, 작품 구역, 작품 소개글, 작품 정보, 제작 비하인드 게시물, 전시 정보 등 작가가 직접 입력·업로드하는 정보",
					]}
				/>

				<h3 className="mt-4 text-lg font-semibold">2-4. 서비스 이용 과정에서 자동으로 생성·수집되는 정보</h3>
				<List items={["접속 IP 주소, 쿠키, 접속 일시, 서비스 이용 기록, 기기 정보(OS·브라우저 종류 등)"]} />
			</Section>

			<Section title="제 3조 개인정보의 처리 및 보유 기간">
				<p>두록은 법령에 따른 보유·이용 기간 또는 정보주체로부터 동의받은 기간 내에서 개인정보를 처리·보유합니다.</p>
				<Table
					head={["처리 목적", "제공받는 항목"]}
					rows={[
						["회원 가입 및 관리", "탈퇴 시 즉시 파기 (단, 구독 만료 시에는 관련 법령에 따라 3개월 보관 후 파기)"],
						["작가 게시 콘텐츠", "회원 탈퇴 또는 게시물 삭제 요청 시까지"],
						["문의·고충 처리 기록", "처리 완료 후 1년"],
					]}
				/>
				<p>관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>
				<List
					items={[
						"[통신비밀보호법] 서비스 이용 관련 로그 기록: 3개월",
						"[전자상거래법] 소비자 불만·분쟁 처리 기록: 3년",
					]}
				/>
			</Section>

			<Section title="제 4조 개인정보의 제3자 제공">
				<p>
					두록은 정보주체의 개인정보를 제1조(처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의
					특별한 규정 등「개인정보 보호법」제17조 및 제18조에 해당하는 경우에만 제3자에게 제공합니다.
				</p>
				<p>두록은 개인정보를 제3자에게 제공하지 않습니다.</p>
			</Section>

			<Section title="제 5조 개인정보 처리업무의 위탁">
				<p>두록은 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
				<Table
					head={["수탁자", "제공받는 항목"]}
					rows={[
						["Amazon Web Services", "서버·데이터 호스팅 및 이미지 저장"],
						["Oracle Cloud", "개발·테스트 환경 서버 호스팅 및 운영 데이터 복제본 저장"],
					]}
				/>
				<p>
					두록은 위탁계약 체결 시「개인정보 보호법」제26조에 따라 개인정보가 안전하게 관리되도록 필요한 사항을
					규정하고 수탁자를 감독합니다. 위탁 업무 내용이나 수탁자가 변경될 경우 본 방침을 통해 공개합니다.
				</p>
			</Section>

			<Section title="제 6조 개인정보의 국외 이전">
				<p>
					두록은 이용자의 개인정보(작품 정보, 작가 정보 등 서비스 데이터)를 국내 리전의 클라우드 서버에 저장하며,
					서비스 데이터를 국외로 이전하지 않습니다.
				</p>
				<p>다만, 서비스 이용 현황 분석을 위해 분석 도구를 사용해 아래와 같이 일부 행태 정보가 국외로 이전됩니다.</p>
				<Table
					head={["수탁자", "제공받는 항목"]}
					rows={[
						["Amazon Web Services", "서버·데이터 호스팅 및 이미지 저장"],
						["Oracle Cloud", "개발·테스트 환경 서버 호스팅 및 운영 데이터 복제본 저장"],
					]}
				/>
				<p>
					이용자는 위 행태 정보의 국외 이전을 원하지 않는 경우, 제11조에 안내된 거부 방법에 따라 수집 자체를 차단할 수
					있습니다. 다만 이 경우에도 서비스의 기본 기능 이용에는 제한이 없습니다.
				</p>
			</Section>

			<Section title="제 7조 개인정보의 파기 절차 및 방법">
				<p>
					두록은 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당
					개인정보를 파기합니다.
				</p>
				<List
					items={[
						"파기 절차: 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 확인을 거쳐 파기합니다.",
						"파기 방법: 전자적 파일은 복구·재생되지 않도록 기술적 방법으로 영구 삭제하며, 종이 문서는 분쇄하거나 소각합니다.",
					]}
				/>
			</Section>

			<Section title="제 8조 정보주체와 법정대리인의 권리·의무 및 행사 방법">
				<p>정보주체는 두록에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 및 동의 철회를 요구할 수 있습니다.</p>
				<List
					items={[
						"이용자는 서비스 내 [내 프로필] 메뉴 하단의 [회원 탈퇴] 기능을 통해 위 권리를 행사할 수 있습니다.",
						"회원은 서비스 내 기능을 통해 직접 본인의 정보를 조회·수정하거나 회원 탈퇴(동의 철회)를 할 수 있습니다.",
					]}
				/>
			</Section>

			<Section title="제 9조 만 14세 미만 아동의 개인정보 처리">
				<p>두록은 만 14세 미만 아동의 회원가입을 받지 않습니다.</p>
			</Section>

			<Section title="제 10조 개인정보의 안전성 확보 조치">
				<p>두록은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
				<List
					items={[
						"관리적 조치: 개인정보 취급자 최소화 및 교육",
						"기술적 조치: 비밀번호 등 중요 정보의 암호화 저장·전송, 접근권한 관리, 탈퇴 시 개인정보 즉시 파기(단, 구독 만료 시에는 관련 법령에 따라 3개월 보관 후 파기)",
					]}
				/>
			</Section>

			<Section title="제 11조 개인정보 자동 수집 장치(쿠키)의 설치·운영 및 거부">
				<p>두록은 이용자에게 맞춤형 서비스를 제공하기 위해 쿠키(cookie)를 사용합니다.</p>
				<List
					items={[
						"사용 목적: 로그인 상태 유지, 서비스 이용 분석 및 이용 환경 개선",
						"거부 방법: 이용자는 웹브라우저 설정에서 쿠키 저장을 거부할 수 있습니다. 다만 쿠키 저장을 거부할 경우 로그인 등 일부 서비스 이용에 어려움이 있을 수 있습니다.",
					]}
				/>

				<h3 className="mt-4 text-lg font-semibold">제3자 분석 도구의 사용</h3>
				<Table
					head={["수집 주체", "수집 항목", "수집 목적", "거부 방법"]}
					rows={[
						[
							"Google LLC (Google Analytics)",
							"방문 기록, 페이지 이용 내역, 기기·브라우저 정보, 대략적 위치 정보 (IP 기반)",
							"서비스 이용 통계 분석",
							"Google Analytics 차단 브라우저 부가기능 설치 또는 웹브라우저 쿠키 저장 차단",
						],
						[
							"Amplitude, Inc.",
							"서비스 내 행동 데이터(클릭, 화면 이동 등), 기기·브라우저 정보",
							"서비스 이용 패턴 분석 및 개선",
							"웹브라우저 쿠키 저장 차단 (위 거부 방법 참조)",
						],
					]}
				/>
				<p>제3자 분석 도구를 통해 수집된 행태정보의 국외 이전에 관한 사항은 제6조를 따릅니다.</p>
			</Section>

			<Section title="제 12조 개인정보 보호책임자">
				<p>
					두록은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 문의·고충을
					처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
				</p>
				<List
					items={[
						"개인정보 보호책임자: [성명 / 직책]",
						<>
							연락처: <a href="mailto:DologArchive@gmail.com" className="underline">DologArchive@gmail.com</a>
						</>,
					]}
				/>
				<p>
					정보주체는 서비스 이용 중 발생한 개인정보 보호 관련 문의·불만을 위 연락처로 문의하실 수 있으며, 두록은
					지체 없이 답변·처리합니다.
				</p>
			</Section>

			<Section title="제 13조 권익침해 구제 방법">
				<p>정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.</p>
				<List
					items={[
						<>
							개인정보분쟁조정위원회: (국번없이) 1833-6972 /{" "}
							<a href="http://www.kopico.go.kr/" className="underline" target="_blank" rel="noreferrer">www.kopico.go.kr</a>
						</>,
						<>
							개인정보침해신고센터: (국번없이) 118 /{" "}
							<a href="https://privacy.kisa.or.kr/" className="underline" target="_blank" rel="noreferrer">privacy.kisa.or.kr</a>
						</>,
						<>
							대검찰청 사이버수사과: (국번없이) 1301 /{" "}
							<a href="http://www.spo.go.kr/" className="underline" target="_blank" rel="noreferrer">www.spo.go.kr</a>
						</>,
						<>
							경찰청 사이버수사국: (국번없이) 182 /{" "}
							<a href="https://ecrm.cyber.go.kr/" className="underline" target="_blank" rel="noreferrer">ecrm.cyber.go.kr</a>
						</>,
					]}
				/>
			</Section>

			<Section title="제 14조 개인정보 처리방침의 변경">
				<p>
					본 개인정보 처리방침은 2026년 OO월 OO일부터 적용됩니다. 법령·정책 또는 서비스 변경에 따라 내용이
					추가·삭제·수정될 경우, 변경 사항을 시행 7일 전부터 서비스 내 공지사항을 통해 안내합니다.
				</p>
				<List items={["공고일자: 2026년 OO월 OO일", "시행일자: 2026년 OO월 OO일"]} />
			</Section>
		</article>
	);
}
