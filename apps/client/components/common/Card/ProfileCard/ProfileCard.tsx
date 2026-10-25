import Image from "next/image";
import { EmptyArtistIcon } from "../../icons/EmptyArtistIcon";
import { profileCardStyles as s } from "./ProfileCard.styles";
import type { ProfileCardProps } from "./ProfileCard.types";

export const ProfileCard = ({ imageUrl, name, engName, bio, bottomSlot }: ProfileCardProps) => {
	const nameContent = (
		<>
			{/* 국문 성명이 없으면 영문 성명만, 둘 다 없으면 이름 자리를 비운다 */}
			{name && <h3 className={s.name}>{name}</h3>}
			{engName && <p className={s.engName}>{engName}</p>}
		</>
	);

	return (
		<article className={s.wrapper}>
			{/* 이미지 + 모바일 이름 */}
			<div className={s.imageWrapper}>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={name || engName || ""}
						width={150}
						height={200}
						className={s.image}
					/>
				) : (
					<div
						className={s.imageEmpty}
						style={{ backgroundColor: "color-mix(in srgb, var(--btn-text) 10%, transparent)" }}
					>
						<EmptyArtistIcon />
					</div>
				)}
				{/* 모바일: 이미지 옆 이름 */}
				<div className={s.mobileText}>{nameContent}</div>
			</div>

			{/* 우측 컬럼 */}
			<div className={s.rightCol}>
				{/* 데스크탑: 우측 상단 이름 */}
				<div className={s.desktopCol}>{nameContent}</div>
				{bio && <p className={s.bio}>{bio}</p>}
				{bottomSlot}
			</div>
		</article>
	);
};
