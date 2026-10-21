"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toErrorMessage } from "@/app/artist-admin/(shell)/_api/actions";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import {
	type ArtworkVisibility,
	type ArtworkVisibilitySource,
	toArtworkVisibility,
	updateArtworkVisibility,
} from "../_api/updateArtworkVisibility";

export const useArtworkVisibility = (artworkId: string, initial: ArtworkVisibilitySource) => {
	const router = useRouter();
	const [visibility, setVisibility] = useState<ArtworkVisibility>(() =>
		toArtworkVisibility(initial),
	);
	const [isSaving, setIsSaving] = useState(false);
	const { notice, showNotice, closeNotice } = useNoticeModal();

	const handleChange = async (next: ArtworkVisibility) => {
		if (next === visibility || isSaving) return;
		setIsSaving(true);
		try {
			await updateArtworkVisibility(artworkId, next);
			setVisibility(next);
			router.refresh();
		} catch (error) {
			showNotice("공개 상태 변경에 실패했어요", toErrorMessage(error));
		} finally {
			setIsSaving(false);
		}
	};

	return { visibility, isSaving, handleChange, notice, closeNotice };
};
