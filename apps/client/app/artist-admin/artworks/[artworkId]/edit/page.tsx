"use client";

import { useRouter } from "next/navigation";
import { ArtworkForm } from "../../_components/ArtworkForm";

export default function EditArtworkPage() {
	const router = useRouter();

	return <ArtworkForm title="작품 이름이 표시됨" onBack={() => router.back()} />;
}
