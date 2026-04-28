import Image from "next/image";

interface HeaderProps {
	logoUrl?: string;
	variant?: "logo" | "back";
	onBackClick?: () => void;
	onMenuClick?: () => void;
}

export const Header = ({ logoUrl, onMenuClick, variant = "logo", onBackClick }: HeaderProps) => {
	return (
		<header className="flex items-center justify-between bg-normal px-4 py-3 sticky top-0 z-10">
			{variant === "back" ? (
				<Image
					src="/icons/backBtn.svg"
					alt="뒤로가기"
					width={24}
					height={24}
					onClick={onBackClick}
					className="cursor-pointer"
				/>
			) : (
				<Image src={logoUrl ?? ""} alt="로고" width={34} height={24} priority />
			)}
			<Image
				src="/icons/leadingBtn.svg"
				alt="사이드바"
				width={24}
				height={24}
				onClick={onMenuClick}
				className="cursor-pointer"
			/>
		</header>
	);
};
