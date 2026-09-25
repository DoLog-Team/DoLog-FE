import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/common/Button/Button";
import { EmptyArtistIcon } from "@/components/common/icons/EmptyArtistIcon";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import { cn } from "@/lib/utils/cn";
import type { ArtistAdminProfile } from "../../_mocks/profile";
import { Engagement } from "../Engagement";
import { SECTION_TITLE_CLASS } from "../SectionHeader";

const PROFILE_EDIT_PATH = "/artist-admin/profile/edit";

// 보연 TODO: 두록 작가 상세 페이지 경로가 정해지면 작가 프로필 보기에 연결
const ACTIONS = [
	{ label: "프로필 수정", icon: "/icons/edit.svg", href: PROFILE_EDIT_PATH },
	{ label: "작가 프로필 보기", icon: "/icons/check.svg", href: null },
] as const;

interface ProfileSectionProps {
	profile: ArtistAdminProfile;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
	const rows = [
		...(profile.email ? [{ label: "이메일", value: profile.email }] : []),
		...profile.sns.map((sns) => ({ label: sns.label, value: sns.url })),
	].map((row) => ({
		...row,
		value: <span className="text-light">{row.value}</span>,
	}));

	return (
		<section className="grid grid-cols-8 gap-x-2 pb-6 min-[721px]:grid-cols-4 min-[721px]:gap-x-5 min-[721px]:pt-4 min-[721px]:pb-7">
			{/* 프로필 이미지 */}
			<div className="col-span-3 pt-4 min-[721px]:col-span-1 min-[721px]:row-span-2">
				{profile.profileImage ? (
					<Image
						src={profile.profileImage}
						alt={profile.nameKo}
						width={254}
						height={359}
						className="aspect-[1/1.414] w-full object-cover"
					/>
				) : (
					<div className="flex aspect-[1/1.414] w-full items-center justify-center bg-fg-lighter">
						<EmptyArtistIcon color="var(--color-text-lightest)" />
					</div>
				)}
			</div>

			<div className="col-span-5 self-end min-[721px]:col-span-3 min-[721px]:self-start min-[721px]:pt-4 min-[721px]:pb-5">
				<div className="flex items-center gap-1">
					<Title
						title={profile.nameKo}
						size="head2"
						margin="none"
						className={SECTION_TITLE_CLASS}
					/>
					<div className="hidden items-center gap-2.5 min-[721px]:flex">
						{ACTIONS.map((action) => (
							<ProfileAction key={action.label} {...action} size="sm" />
						))}
					</div>
				</div>
				{profile.nameEn && <p className="px-0.5 pt-2 text-body1 text-light">{profile.nameEn}</p>}
			</div>

			{/* 소개·SNS·조회수 */}
			<div className="col-span-8 pt-5 min-[721px]:col-span-3 min-[721px]:pt-0">
				{profile.bio && (
					<p className="mb-6 px-0.5 text-body1 text-light whitespace-pre-wrap">{profile.bio}</p>
				)}
				{rows.length > 0 && <RowList rows={rows} className="mb-5 gap-1.5" />}

				<Engagement viewCount={profile.viewCount} likeCount={profile.likeCount} />

				<div className="mt-7 flex flex-col gap-2.5 min-[721px]:hidden">
					{ACTIONS.map((action) => (
						<ProfileAction key={action.label} {...action} size="lg" />
					))}
				</div>
			</div>
		</section>
	);
}

interface ProfileActionProps {
	label: string;
	icon: string;
	href: string | null;
	size: "sm" | "lg";
}

function ProfileAction({ label, icon, href, size }: ProfileActionProps) {
	const className =
		size === "sm"
			? "flex h-6 cursor-pointer items-center gap-[3px] rounded-sm bg-fg-lighter px-1 text-body2-bold text-lighter"
			: cn(buttonVariants({ variant: "assistive", size: "lg" }), "w-full text-body1-bold");
	const iconSize = size === "sm" ? 16 : 28;
	const content = (
		<>
			<Image src={icon} alt="" width={iconSize} height={iconSize} />
			<span className={size === "sm" ? "px-0.5" : "px-2"}>{label}</span>
		</>
	);

	if (!href) {
		return (
			<button type="button" className={className}>
				{content}
			</button>
		);
	}
	return (
		<Link href={href} className={className}>
			{content}
		</Link>
	);
}
