import Image from "next/image";
import { profileCardStyles as s } from "./ProfileCard.styles";
import type { ProfileCardProps } from "./ProfileCard.types";

export const ProfileCard = ({ imageUrl, name, engName, bio }: ProfileCardProps) => {
	return (
		<article className={s.wrapper}>
			{/* Top */}
			<div className={s.top}>
				<Image src={imageUrl} alt={name} width={150} height={200} className={s.image} />

				<div className={s.textWrapper}>
					<div className={s.textInner}>
						<h3 className={s.name}>{name}</h3>
						<p className={s.engName}>{engName}</p>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<p className={s.bio}>{bio}</p>
		</article>
	);
};
