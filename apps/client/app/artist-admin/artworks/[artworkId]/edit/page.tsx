"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/common/Spinner/LoadingScreen";
import { getMyArtwork, type MyArtworkDetail } from "../../_api/getMyArtwork";
import { ArtworkForm } from "../../_components/ArtworkForm";

export default function EditArtworkPage() {
	const router = useRouter();
	const { artworkId } = useParams<{ artworkId: string }>();
	const [artwork, setArtwork] = useState<MyArtworkDetail | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getMyArtwork(artworkId)
			.then(setArtwork)
			.catch(() => {})
			.finally(() => setIsLoading(false));
	}, [artworkId]);

	if (isLoading) return <LoadingScreen />;
	if (!artwork) return <div className="p-8 text-body1 text-lighter">작품을 찾을 수 없어요.</div>;

	return <ArtworkForm artwork={artwork} onBack={() => router.back()} />;
}
