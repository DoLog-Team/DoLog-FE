import { EmptyArtistIcon } from "./EmptyArtistIcon";

interface EmptyAvatarBoxProps {
	className: string;
}

// 빈 프로필/작가 아바타 공통 UI — 배경·아이콘 색은 전시 커스텀 컬러가 있으면 그 색, 없으면 globals.css 기본값
export function EmptyAvatarBox({ className }: EmptyAvatarBoxProps) {
	return (
		<div className={className} style={{ backgroundColor: "var(--avatar-bg)" }}>
			<EmptyArtistIcon color="var(--avatar-icon)" />
		</div>
	);
}
