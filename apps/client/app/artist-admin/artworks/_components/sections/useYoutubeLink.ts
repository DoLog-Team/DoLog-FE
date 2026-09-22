"use client";

import { useState } from "react";

const YOUTUBE_ID_REGEX =
	/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const extractYoutubeVideoId = (url: string): string | null => {
	const match = url.match(YOUTUBE_ID_REGEX);
	return match?.[1] ?? null;
};

type LinkStatus = "idle" | "loading" | "success" | "error";

export const useYoutubeLink = () => {
	const [videoUrl, setVideoUrl] = useState("");
	const [linkedUrl, setLinkedUrl] = useState<string | null>(null);
	const [linkStatus, setLinkStatus] = useState<LinkStatus>("idle");
	const [videoTitle, setVideoTitle] = useState("");
	const [thumbnailUrl, setThumbnailUrl] = useState("");

	const handleVideoUrlChange = (value: string) => {
		setVideoUrl(value);
		if (value !== linkedUrl) {
			setLinkStatus("idle");
			setVideoTitle("");
			setThumbnailUrl("");
			setLinkedUrl(null);
		}
	};

	const handleLink = async () => {
		const videoId = extractYoutubeVideoId(videoUrl);
		if (!videoId) {
			setLinkStatus("error");
			return;
		}

		setLinkStatus("loading");
		try {
			const res = await fetch(
				`https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
			);
			if (!res.ok) throw new Error("존재하지 않는 영상이에요.");

			const data: { title: string } = await res.json();
			setVideoTitle(data.title);
			setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
			setLinkedUrl(videoUrl);
			setLinkStatus("success");
		} catch {
			setLinkStatus("error");
		}
	};

	return {
		videoUrl,
		linkStatus,
		videoTitle,
		thumbnailUrl,
		handleVideoUrlChange,
		handleLink,
	};
};
