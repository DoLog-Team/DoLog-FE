import Image from "next/image";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";

export default function MainFooter() {
	return (
		<footer className="w-full pt-12 pb-12 bg-fg-lighter mt-12">
			<DesktopContainer>
				<div className="flex flex-col">
					<Image src="/images/logo.svg" alt="DoLog Logo" width={50} height={25} />
					<div className="h-5 w-full" />
					<div className="flex flex-col gap-1">
						<p className="text-body2 text-lighter">우리의 졸업 전시, 더 오래 기록하는 방법</p>
						<p className="text-body2 text-lighter">dologarchive@gmail.com</p>
					</div>
					<div className="h-3 w-full" />
					<p className="text-body3-bold text-lightest">Website powered by DOLOG</p>
				</div>
			</DesktopContainer>
		</footer>
	);
}
