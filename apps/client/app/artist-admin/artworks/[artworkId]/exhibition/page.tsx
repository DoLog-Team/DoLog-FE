"use client";

import { useParams, useRouter } from "next/navigation";
import { ArtworkExhibitionForm } from "./_components/ArtworkExhibitionForm";

export default function ArtworkExhibitionPage() {
	const router = useRouter();
	const { artworkId } = useParams<{ artworkId: string }>();

	return (
		<ArtworkExhibitionForm
			artworkId={artworkId}
			title="농담곰 자화상"
			onBack={() => router.back()}
		/>
	);
}
