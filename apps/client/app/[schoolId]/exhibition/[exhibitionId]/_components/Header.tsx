import Image from "next/image";

export const Header = () => {
	return (
		<header className="flex items-center justify-between px-4 py-3">
			<Image src="/images/exhibitionLogo.svg" alt="DoLog" width={34} height={24} priority />
			{/* TODO : sideBar 열기 */}
			<Image src="/icons/leadingBtn.svg" alt="햄버거" width={24} height={24} />
		</header>
	);
};
