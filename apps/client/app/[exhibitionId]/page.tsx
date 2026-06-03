import { buttonVariants } from "components";
import Image from "next/image";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { SectionTimeTracker } from "@/components/common/SectionTimeTracker";
import { TrackedLink } from "@/components/common/TrackedLink";
import { getExhibitionDetail, getExhibitionHost, getHostSns } from "@/lib/api/exhibition";
import { resolveExhibitionId } from "./_api/resolveExhibitionId";
import { ExhibitionDetailSection } from "./_components/ExhibitionDetailSection";
import { ExhibitionHostSection } from "./_components/ExhibitionHostSection";
import { ExhibitionIntroSection } from "./_components/ExhibitionIntroSection";
import { ExhibitionLocationSection } from "./_components/ExhibitionLocationSection";
import { Header } from "./_components/Header";
import { NotFound } from "./_components/NotFound";

// import { MOCK_EXHIBITION_DETAIL, MOCK_EXHIBITION_HOST, MOCK_HOST_SNS } from "./_mocks/exhibition";

interface ExhibitionDetailPageProps {
	params: Promise<{ exhibitionId: string }>;
}

export default async function ExhibitionDetailPage({ params }: ExhibitionDetailPageProps) {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);

	if (!uuid) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="전시를 찾을 수 없습니다." />
			</main>
		);
	}

	const [exhibition, host, sns] = await Promise.all([
		getExhibitionDetail(uuid),
		getExhibitionHost(uuid),
		getHostSns(uuid),
	]);

	if (!exhibition) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="전시를 찾을 수 없습니다." />
			</main>
		);
	}

	const exhibitionData = exhibition;
	const hostData = host;
	const snsData = sns;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Event",
		name: `${exhibitionData.univName} ${exhibitionData.deptName}${exhibitionData.exhibitionType ? ` ${exhibitionData.exhibitionType}` : ""} ${exhibitionData.title}`,
		description: `${exhibitionData.univName} ${exhibitionData.deptName}${exhibitionData.exhibitionType ? ` ${exhibitionData.exhibitionType}` : ""} ${exhibitionData.title}의 온라인 전시 아카이브입니다. 전시, 작품 정보와 참여 작가를 두록(Dolog)에서 확인할 수 있습니다.`,
		startDate: exhibitionData.startDate,
		endDate: exhibitionData.endDate,
		image: exhibitionData.exhibitionImg,
		eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
		eventStatus: "https://schema.org/EventScheduled",
		location: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				streetAddress: exhibitionData.location.address,
			},
		},
		organizer: {
			"@type": "Organization",
			name: `${exhibitionData.univName} ${exhibitionData.deptName}`,
		},
		publisher: {
			"@type": "Organization",
			name: "두록",
			alternateName: "Dolog",
			url: "https://dolog.kr/",
			sameAs: ["https://www.instagram.com/dolog.archive"],
		},
		url: `https://dolog.kr/${exhibitionId}`,
	};

	return (
		<main>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<SectionTimeTracker
				pageName="exhibition_intro"
				sections={["intro", "detail", "location", "host"]}
			/>
			<Header />

			<DesktopContainer>
				{/* 대표 이미지 + 제목/기본 정보 + 전시 소개: 데스크탑에서 flex row */}
				<div className="flex flex-col min-[721px]:flex-row min-[721px]:items-start min-[721px]:gap-5">
					{/* 이미지: 모바일 full-width, 데스크탑 fixed width */}
					<div className="relative -mx-4 w-[calc(100%+2rem)] aspect-[1/1.414] min-[721px]:mx-0 min-[721px]:w-[30%] min-[721px]:shrink-0 min-[721px]:mt-8">
						<Image
							src={exhibitionData.exhibitionImg}
							alt={exhibitionData.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
					{/* 오른쪽: 제목/기본 정보 + 전시 소개 */}
					<div className="flex flex-col min-[721px]:flex-1">
						<ExhibitionIntroSection exhibition={exhibitionData} exhibitionId={exhibitionId} />
						<ExhibitionDetailSection exhibition={exhibitionData} />
						<div className="hidden min-[721px]:flex flex-col justify-center items-center pb-6 min-[721px]:items-start">
							<TrackedLink
								href={`/${exhibitionId}/artwork`}
								eventName="Exhibition CTA Clicked"
								eventProps={{ exhibition_id: exhibitionId }}
								className={buttonVariants({
									variant: "main",
									className: "w-full max-w-85 justify-center",
								})}
							>
								전시물 감상하기
							</TrackedLink>
						</div>
					</div>
				</div>
			</DesktopContainer>
			<Divider />
			<DesktopContainer>
				{/* 장소 */}
				<ExhibitionLocationSection location={exhibitionData.location} />
				{/* 주최 기관 */}
				{hostData && <ExhibitionHostSection hostInfo={hostData} sns={snsData} />}
			</DesktopContainer>
		</main>
	);
}
