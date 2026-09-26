import type { Metadata } from "next";
import { ArtistList } from "./_components/ArtistList";

export const metadata: Metadata = {
	title: "참여 작가 관리 | 두록",
	robots: { index: false, follow: false },
};

export default function AdminArtistsPage() {
	return <ArtistList />;
}
