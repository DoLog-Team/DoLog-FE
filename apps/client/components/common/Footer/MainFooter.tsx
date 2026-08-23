import Image from "next/image";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { resolveSnsHref } from "@/lib/utils/sns";

interface MainFooterProps {
	className?: string;
	logoSrc?: string;
}

const LEGAL_LINKS = [
	{ label: "이용약관", href: "#" },
	{ label: "개인정보 처리 방침", href: "#" },
	{ label: "도움말 센터", href: "#" },
];

export default function MainFooter({
	className = "bg-fg-lighter",
	logoSrc = "/images/logo.svg",
}: MainFooterProps = {}) {
	return (
		<footer className={`w-full pt-12 pb-20 mt-12 ${className}`}>
			<DesktopContainer>
				<div className="flex flex-col">
					<Image src={logoSrc} alt="DoLog Logo" width={50} height={25} />
					<div className="h-7" />
					<div className="flex flex-col gap-1">
						<p className="text-body2-bold text-(--color-text-lighter)">
							email{" "}
							<a href="mailto:dologarchive@gmail.com" className="underline text-body2 font-normal">
								dologarchive@gmail.com
							</a>
						</p>
						<p className="text-body2-bold text-(--color-text-lighter)">
							instagram{" "}
							<a
								href={resolveSnsHref("instagram", "@dolog.archive") ?? "#"}
								target="_blank"
								rel="noopener noreferrer"
								className="underline text-body2 font-normal"
							>
								@dolog.archive
							</a>
						</p>
					</div>
					<div className="h-3" />
					<p className="text-body4-bold text-(--color-text-lightest)">
						Website powered by 두록(DOLOG) <br />
						대학 전시 웹사이트 제작 및 작품 아카이빙 플랫폼
					</p>
					<div className="h-2.5" />
					<p className="text-body3 text-(--color-text-lightest)">
						두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다.
						<br />
						졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.
					</p>
					<div className="h-7" />
					<div className="flex items-center gap-2.5">
						{LEGAL_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-body4-bold text-(--color-text-lightest) underline"
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			</DesktopContainer>
		</footer>
	);
}
