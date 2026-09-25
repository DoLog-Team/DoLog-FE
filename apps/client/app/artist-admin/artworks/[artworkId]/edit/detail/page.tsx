"use client";

import { useRouter } from "next/navigation";
import { ArtworkDetailForm } from "../../../_components/ArtworkDetailForm";

export default function EditArtworkDetailPage() {
	const router = useRouter();

	return <ArtworkDetailForm title="작품 이름이 표시됨" onBack={() => router.back()} />;
}
