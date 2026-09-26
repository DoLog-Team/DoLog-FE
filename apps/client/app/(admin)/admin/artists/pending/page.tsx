import type { Metadata } from "next";
import { PendingArtistList } from "../_components/PendingArtistList";

export const metadata: Metadata = {
	title: "참여 대기 작가 | 두록",
	robots: { index: false, follow: false },
};

export default function AdminPendingArtistsPage() {
	return <PendingArtistList />;
}
