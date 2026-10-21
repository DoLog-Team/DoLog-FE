"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/common/Spinner/LoadingScreen";
import { getMyArtwork, type MyArtworkDetail } from "../../_api/getMyArtwork";
import { ArtworkExhibitionForm } from "./_components/ArtworkExhibitionForm";

export default function ArtworkExhibitionPage() {
	const router = useRouter();
	const { artworkId } = useParams<{ artworkId: string }>();
	const searchParams = useSearchParams();
	const pendingExhibitionId = searchParams.get("exhibitionId");
	const [artwork, setArtwork] = useState<MyArtworkDetail | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getMyArtwork(artworkId)
			.then(setArtwork)
			.catch(() => {})
			.finally(() => setIsLoading(false));
	}, [artworkId]);

	const reload = () => {
		getMyArtwork(artworkId)
			.then(setArtwork)
			.catch(() => {});
		router.refresh();
	};

	if (isLoading) return <LoadingScreen />;
	if (!artwork) return <div className="p-8 text-body1 text-lighter">작품을 찾을 수 없어요.</div>;

	return (
		<ArtworkExhibitionForm
			artwork={artwork}
			pendingExhibitionId={pendingExhibitionId}
			onBack={() => router.back()}
			onSubmitted={reload}
			onCancelled={() => {
				router.push("/artist-admin");
				router.refresh();
			}}
		/>
	);
}
