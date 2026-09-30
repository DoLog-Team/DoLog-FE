import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/common/Button/Button";
import { ChevronIcon } from "@/components/common/icons/ChevronIcon";
import { cn } from "@/lib/utils/cn";

// 두록 자주 묻는 질문 (노션) — 외부 링크는 모두 새 창
const FAQ_HREF = "https://tangy-parka-0cb.notion.site/3eb89814416f8006bc94c05b8711a79a";
// 두록 카카오톡 채널
const KAKAO_CHANNEL_HREF = "https://pf.kakao.com/_pAWJX";

// 피그마 모바일은 오른쪽 화살표 없음
const HELP_BUTTON_CLASS = "flex-1 gap-1 min-[721px]:max-w-50";

export const PlanHelp = () => (
	// 아래 여백은 공통 푸터의 위 여백(48px)이 대신함
	<section className="flex flex-col items-center gap-5 pt-12.5 min-[721px]:flex-row min-[721px]:justify-between">
		<h2 className="text-body1 text-light min-[721px]:text-head1 min-[721px]:text-strong">
			어떤 플랜을 선택해야 할지 고민되시나요?
		</h2>
		<div className="flex w-full gap-2 min-[721px]:w-auto min-[721px]:flex-1 min-[721px]:justify-end">
			<Link
				href={FAQ_HREF}
				target="_blank"
				rel="noreferrer"
				className={buttonVariants({
					variant: "assistive",
					size: "lg",
					className: HELP_BUTTON_CLASS,
				})}
			>
				자주 묻는 질문
				<ChevronIcon direction="right" className="hidden text-icon-light min-[721px]:block" />
			</Link>
			{/* 카카오 브랜드 색이라 토큰 대신 고정값 (SocialLoginButton 선례) */}
			<Link
				href={KAKAO_CHANNEL_HREF}
				target="_blank"
				rel="noreferrer"
				className={cn(
					buttonVariants({ size: "lg", className: HELP_BUTTON_CLASS }),
					"bg-[#fee500] text-strong",
				)}
			>
				<Image src="/icons/kakao.svg" alt="" width={24} height={24} />
				채널 바로가기
				<ChevronIcon direction="right" className="hidden min-[721px]:block" />
			</Link>
		</div>
	</section>
);
