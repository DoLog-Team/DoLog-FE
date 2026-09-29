import type { AdminArtist } from "../../_mocks/artists";

export const ArtistCard = ({
	artist,
	showArtworkCount,
}: {
	artist: AdminArtist;
	showArtworkCount?: boolean;
}) => (
	<div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
		<p className="text-body1-bold text-strong">{artist.name}</p>
		<div className="flex flex-col gap-1 text-body2 text-light">
			<p className="truncate">{artist.email}</p>
			<p className="truncate">{artist.greeting}</p>
			{showArtworkCount && <p>작품 {artist.artworkCount}개</p>}
		</div>
	</div>
);
