import type { Metadata } from "next";
import { ArtworkList } from "../_components/ArtworkList";

export const metadata: Metadata = {
	title: "숨긴 작품 관리 | 두록",
	robots: { index: false, follow: false },
};

export default function AdminHiddenArtworksPage() {
	return <ArtworkList mode="hidden" />;
}
