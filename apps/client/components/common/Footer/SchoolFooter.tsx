import Image from "next/image";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import type { ExhibitionFooter } from "@/lib/api/layout.types";

export default function SchoolFooter({
	title,
	department,
	address,
	univ_name,
	detail_location,
	email,
	copyright,
}: ExhibitionFooter) {
	return (
		<footer className="w-full pb-20 flex flex-col mt-12 bg-fg-lighter">
			<DesktopContainer className="flex pt-6 flex-col">
				<div className="flex flex-col gap-1">
					<h3 className="text-body1-bold text-light">{title}</h3>
					<div className="h-5 w-full" />
					<p className="text-body2 text-lighter">
						{univ_name} {department}
					</p>
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
				<a href="https://dolog.kr/" rel="noopener noreferrer" className="w-max">
					<Image src="/images/logo.svg" alt={`${title} Logo`} width={60} height={18} />
				</a>
			</DesktopContainer>
		</footer>
	);
}
