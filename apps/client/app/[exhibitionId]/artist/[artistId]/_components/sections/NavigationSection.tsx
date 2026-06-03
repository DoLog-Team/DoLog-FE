import { PostNavigation } from "@/app/[exhibitionId]/artist/[artistId]/_components/Navigation/PostNavigation/PostNavigation";
import type { ArtistDetail } from "@/lib/api/artists/artist-detail.types";

export function NavigationSection({ artist }: { artist: ArtistDetail }) {
	return (
		<section className="mt-7 flex flex-col gap-2.5 mb-6">
			<span className="text-body1-bold text-lighter pb-2.5">작가 둘러보기</span>
			<PostNavigation
				prevPost={
					artist.prevArtist
						? { id: artist.prevArtist.id, title: artist.prevArtist.name }
						: undefined
				}
				nextPost={
					artist.nextArtist
						? { id: artist.nextArtist.id, title: artist.nextArtist.name }
						: undefined
				}
			/>
		</section>
	);
}
