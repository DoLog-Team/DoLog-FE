import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { PLAN_CONTAINER_CLASS } from "./planPage.styles";

// 뒤로가기(router.back)는 새 탭·직접 진입이면 돌아갈 곳이 없어서 슈퍼 어드민 홈으로 고정
export const PlanHeader = () => (
	<header className="w-full border-stroke-lightest border-b bg-normal">
		<div className={cn(PLAN_CONTAINER_CLASS, "flex h-11 items-center min-[721px]:h-17")}>
			<Link href="/admin" aria-label="슈퍼 어드민 홈으로" className="flex items-center">
				<Image src="/icons/backBtn.svg" alt="" width={24} height={24} />
				<span className="px-0.5 text-body1-bold text-strong">사용 중인 플랜</span>
			</Link>
		</div>
	</header>
);
