import Link from "next/link";
import MainFooter from "@/components/common/Footer/MainFooter";

export default function TestPage() {
	return (
		<div className="flex flex-col bg-normal">
			<div className="flex flex-col items-center text-strong min-h-dvh px-4 py-20">
				<h1 className="text-head1 mb-10">두록(DoLog): 대학 전시 통합 플랫폼</h1>

				<div className="grid grid-cols-2 gap-6 w-full max-w-lg">
					<Link
						href="/1"
						className="p-6 fg-light stroke-lighter rounded-2xl hover:scale-105 transition-transform"
					>
						<h2 className="text-head3 text-cta-bg">흙에서 시작되는 모든 이야기</h2>
						<p className="text-light">한국대학교 도예과</p>
					</Link>

					<Link
						href="/2"
						className="p-6 fg-light stroke-lighter rounded-2xl hover:scale-105 transition-transform"
					>
						<h2 className="text-head3 text-cta-bg">되돌아가는 삶</h2>
						<p className="text-light">한국대학교 불교미술전공</p>
					</Link>
				</div>

				<div className="mt-10 bg-lightest rounded-xl p-4">
					<p className="text-body2 text-light text-center">
						위에 버튼을 누르거나 <br />
						주소창에 <b className="text-strong">/1</b> 또는 <b className="text-strong">/2</b>를
						입력해서 <br />
						테마가 바뀌는지 확인해보세요 ~~
					</p>
				</div>
			</div>

			<div className="mt-12 bg-normal">
				<MainFooter />
			</div>
		</div>
	);
}
