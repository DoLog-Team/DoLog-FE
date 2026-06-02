import Image from "next/image";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";

interface SchoolFooterProps {
	logoSrc?: string;
	title: string;
	department: string;
	address: string;
	detail_location: string; //상세 주소
	email: string;
	copyright: string;
}

export default function SchoolFooter({
	logoSrc,
	title,
	department,
	address,
	detail_location,
	email,
	copyright,
}: SchoolFooterProps) {
	return (
		<footer className="w-full pb-20 flex flex-col mt-12 bg-fg-lighter">
			<DesktopContainer className="flex pt-6 flex-col">
				<div className="flex flex-col gap-1">
					<h3 className="text-body1-bold text-light">{title}</h3>
					<div className="h-5 w-full" />
					<p className="text-body2 text-lighter">{department}</p>
					<div>
						<p className="text-body2 text-lighter">{address}</p>
						<p className="text-body2 text-lighter">{detail_location}</p>
					</div>
					<p className="text-body2 text-lighter">{email}</p>
				</div>
				<div className="h-3 w-full" />
				<p className="text-lightest text-body3-bold">
					{copyright} <br />
					Website powered by 두록(DOLOG) <br />
					대학 전시 웹사이트 제작 및 작품 아카이빙 플랫폼
				</p>
				<div className="h-7 w-full" />
				<Image src={logoSrc || "/images/logo.svg"} alt={`${title} Logo`} width={60} height={18} />
			</DesktopContainer>
		</footer>
	);
}
