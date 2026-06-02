import Image from "next/image";

export default function MainFooter() {
	return (
		<footer className="w-full pt-12 pb-12 flex flex-col bg-fg-lighter mt-12">
			<div className="flex flex-col px-4">
				<Image src="/images/logo.svg" alt="DoLog Logo" width={50} height={25} />
				<div className="h-5 w-full" />
				<div className="flex flex-col gap-1">
					<p className="text-body2 text-lighter">
						두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다.
						<br />
						졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.
					</p>
					<p className="text-body2 text-lighter">dologarchive@gmail.com</p>
				</div>
				<div className="h-3 w-full" />
				<p className="text-body3-bold text-lightest">Website powered by DOLOG</p>
			</div>
		</footer>
	);
}
