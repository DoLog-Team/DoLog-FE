"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArtworkForm } from "../_components/ArtworkForm";

const NewArtworkPageContent = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const title = searchParams.get("title") ?? "작품 이름이 표시됨";

	return <ArtworkForm title={title} onBack={() => router.back()} />;
};

export default function NewArtworkPage() {
	return (
		<Suspense>
			<NewArtworkPageContent />
		</Suspense>
	);
}
