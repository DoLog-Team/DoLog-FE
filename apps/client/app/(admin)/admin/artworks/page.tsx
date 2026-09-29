import type { Metadata } from "next";
import { ArtworkList } from "./_components/ArtworkList";

export const metadata: Metadata = {
	title: "전체 작품 관리 | 두록",
	robots: { index: false, follow: false },
};

export default function AdminArtworksPage() {
	return <ArtworkList mode="all" />;
}
