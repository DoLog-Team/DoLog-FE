import Image from "next/image";
import Link from "next/link";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";

interface AdminFooterProps {
	className?: string;
	logoSrc?: string;
}

export function AdminFooter({ className, logoSrc = "/images/logo.svg" }: AdminFooterProps) {
	return (
		<footer className={`w-full pt-12 pb-8 ${className ?? ""}`}>
			<DesktopContainer className="flex flex-col">
				<Image src={logoSrc} alt="DoLog Logo" width={50} height={25} />
				<div className="h-5 w-full" />
				<div className="flex flex-col gap-1">
					<p className="text-body2 text-lighter">email dologarchive@gmail.com</p>
					<p className="text-body2 text-lighter">instagram @dolog.archive</p>
				</div>
				<div className="h-3 w-full" />
				<p className="text-body3-bold text-lightest">
					Website powered by 두록(DOLOG) <br />
					대학 전시 웹사이트 제작 및 작품 아카이빙 플랫폼
				</p>
				<div className="h-3 w-full" />
				<p className="text-body2 text-lighter">
					두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다.
					<br />
					졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.
				</p>
				<div className="h-5 w-full" />
				<div className="flex items-center gap-4">
					<Link href="/terms" className="text-body2 text-lighter underline">
						이용약관
					</Link>
					<Link href="/privacy" className="text-body2 text-lighter underline">
						개인정보 처리 방침
					</Link>
					<Link href="/help" className="text-body2 text-lighter underline">
						도움말 센터
					</Link>
				</div>
			</DesktopContainer>
		</footer>
	);
}
