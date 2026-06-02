import Image from "next/image";
import { Divider } from "@/components/common/Divider/Divider";
import { SectionTimeTracker } from "@/components/common/SectionTimeTracker";
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
			{/* 대표 이미지 */}
			<div className="relative w-full aspect-[1/1.414]">
				<Image
					src={exhibitionData.exhibitionImg}
					alt={exhibitionData.title}
					fill
					className="object-cover"
					priority
				/>
			</div>
			{/* 제목 및 기본 정보 */}
			<ExhibitionIntroSection exhibition={exhibitionData} exhibitionId={exhibitionId} />
			{/* 전시 소개 */}
			<ExhibitionDetailSection exhibition={exhibitionData} />
			<Divider fullBleed={false} />
			{/* 장소 */}
			<ExhibitionLocationSection location={exhibitionData.location} />
			{/* 주최 기관 */}
			{hostData && <ExhibitionHostSection hostInfo={hostData} sns={snsData} />}
		</main>
	);
}
