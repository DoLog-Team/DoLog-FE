import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";

interface YoutubeSectionProps {
	youtubeUrl: string | null | undefined;
}

export function YoutubeSection({ youtubeUrl }: YoutubeSectionProps) {
	if (!youtubeUrl || youtubeUrl.trim() === "" || youtubeUrl === "null") {
		return null;
	}

	// 유튜브 URL에서 비디오 ID 추출 및 임베드 URL 변환
	const getEmbedUrl = (url: string) => {
		try {
			const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
			return `https://www.youtube.com/embed/${videoId}`;
		} catch (e) {
			return null;
		}
	};

	const embedUrl = getEmbedUrl(youtubeUrl);
	if (!embedUrl) return null;

	return (
		<section className="flex flex-col pb-1 bg-white">
			<DesktopContainer>
				<div className="relative w-full aspect-video overflow-hidden shadow-sm">
					<iframe
						src={embedUrl}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
						className="absolute top-0 left-0 w-full h-full border-0"
					/>
				</div>
			</DesktopContainer>
		</section>
	);
}
