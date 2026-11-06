"use client";

import { useState } from "react";
import {
	type ArtworkVisibility,
	type ArtworkVisibilitySource,
	toArtworkVisibility,
} from "../_api/updateArtworkVisibility";

export const useArtworkVisibility = (initial: ArtworkVisibilitySource) => {
	const [visibility, setVisibility] = useState<ArtworkVisibility>(() =>
		toArtworkVisibility(initial),
	);

	return { visibility, handleChange: setVisibility };
};
