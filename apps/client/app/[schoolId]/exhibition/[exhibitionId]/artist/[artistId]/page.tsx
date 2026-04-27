"use client";

import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { BTSCardGrid } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import { transformLinks } from "@/components/common/Card/LinkCard/LinkCard.mapper";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";

import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import { Divider } from "@/components/common/Divider/Divider";
import { PostNavigation } from "@/components/common/Navigation/PostNavigation/PostNavigation";
import { Title } from "@/components/common/Title/Title";

import { MOCK_WORK_DATA } from "@/constants/work";
import { MOCK_SNS_DATA } from "@/constants/snsLink";

export default function ArtistDetailPage() {
	const params = useParams();
	const schoolId = params?.schoolId;
	const id = params?.artistId;

	const schoolIdStr = Array.isArray(schoolId) ? schoolId[0] : schoolId || "";
	const idStr = Array.isArray(id) ? id[0] : id || "";

	const linkItems = transformLinks(MOCK_SNS_DATA);

	return (
		<div className="flex flex-col gap-4 py-20 w-full max-w-[375px] mx-auto">
			<section>
				<ProfileCard
					imageUrl="/images/artists/artist4.png"
					name="강슬기"
					engName="Kang Seulgi"
					bio="소성 후에 생기는 균열이나 깨짐을 보며 오히려 더 솔직한 형태라고 느꼈어요. 실패를 숨기지 않고 작업의 의미로 남겨보려 했습니다. 앞으로는 불완전함을 새 가능성으로 바꾸는 작가가 되고 싶습니다."
				/>
			</section>
			<Title title="연락처" size="head2" />
			<LinkCard items={linkItems} />

			{/* 구분선 */}
			<Divider />

			{/* Behind */}
			<section className="mb-8">
				<Title title="Behind The Scene" size="head2" />

				<div className="mt-4">
					<BTSCardGrid
						items={[
							{
								id: 1,
								title: "내가 흙을 사랑하는 이유",
								author: "강슬기",
								imageUrl: "/images/bts/bts1.png",
							},
							{
								id: 2,
								title: "내가 흙을 사랑하는 이유",
								author: "강슬기",
								imageUrl: "/images/bts/bts1.png",
							},
						]}
					/>
				</div>
			</section>

			{/* 작품 */}
			<section>
				<Title title="작품" size="head2" />
				<ListCardGrid items={MOCK_WORK_DATA} limit={3} />
			</section>

			{/* 작가 둘러보기 */}
			<section>
				<Title title="작가 둘러보기" size="body1-bold" color="lighter" />
				<PostNavigation
					prevPost={{ id: 1, title: "배주현" }}
					nextPost={{ id: 3, title: "박수영" }}
				/>
			</section>
		</div>
	);
}
