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

	// 들어온 곳으로 돌아간다 — 마이페이지를 push 하면 마이페이지 뒤로가기가 이 화면으로 와서 무한 반복된다
	// 주소로 바로 들어와 돌아갈 기록이 없으면 마이페이지로 보낸다
	const handleBack = () => {
		if (window.history.length > 1) router.back();
		else router.replace("/artist-admin");
	};

	return <ArtworkForm artwork={artwork} onBack={handleBack} />;
}
