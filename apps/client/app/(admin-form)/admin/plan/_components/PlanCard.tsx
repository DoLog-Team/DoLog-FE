import type { PlanPeriod, PlanTier } from "@/lib/constants/plan";
import { cn } from "@/lib/utils/cn";
import { formatWon, getPlanPrice } from "@/lib/utils/plan";

// 이용 중 띠 노랑(#fff5b5) · 그라데이션 끝 색(#ffeb6e) 은 globals.css 에 토큰 없음
const CURRENT_BAND_YELLOW = "bg-[#fff5b5]";
const DISCOUNT_BADGE_GRADIENT = "bg-[linear-gradient(120deg,var(--color-warning)_0%,#ffeb6e_136%)]";

interface PlanCardProps {
	tier: PlanTier;
	period: PlanPeriod;
	isCurrent: boolean;
}

export const PlanCard = ({ tier, period, isCurrent }: PlanCardProps) => {
	const { months, discountRate, highlighted } = period;
	const { originalTotal, total, monthly } = getPlanPrice(tier.monthlyPrice, period);

	return (
		<article
			className={cn(
				"relative flex min-w-55 flex-1 flex-col overflow-hidden rounded-2xl bg-normal shadow-[0_0_16px_0_rgba(0,0,0,0.01)]",
				isCurrent ? "border-2" : "border",
				highlighted ? "border-warning" : "border-stroke-lighter",
			)}
		>
			{isCurrent && (
				<p
					className={cn(
						"py-2.5 text-center font-medium text-[12px] leading-3.5",
						highlighted ? `${CURRENT_BAND_YELLOW} text-warning` : "bg-stroke-lighter text-lighter",
					)}
				>
					이용 중인 플랜
				</p>
			)}
			{highlighted && (
				<span
					aria-hidden
					className="-top-45 -right-45 pointer-events-none absolute size-90 rounded-full bg-[radial-gradient(circle,#ffeb6e_0%,transparent_70%)] opacity-10"
				/>
			)}

			<div className="flex flex-col gap-7.5 p-6">
				<div className="flex flex-col gap-5">
					<h3 className="text-head1 text-light">{months}개월</h3>
					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-2">
							<p className="flex items-center gap-0.5 text-body4-bold text-light">
								{discountRate > 0 && (
									<>
										<s className="font-normal text-lightest">{formatWon(originalTotal)}</s>
										<span className="text-lightest">→</span>
									</>
								)}
								{formatWon(total)}
							</p>
							<p className="flex items-center gap-2">
								<span className="text-display text-strong">월 {formatWon(monthly)}</span>
								{discountRate > 0 && (
									<span
										className={cn(
											"rounded-[20px] px-2 py-1.5 font-extrabold text-[12px] leading-3.5",
											highlighted
												? `${DISCOUNT_BADGE_GRADIENT} text-white`
												: "bg-fg-lighter text-lighter",
										)}
									>
										{discountRate}%↓
									</span>
								)}
							</p>
						</div>
						<p className="text-body2 text-lighter">짧게 확인해보는 기본 요금제</p>
					</div>
				</div>
				<hr className="border-stroke-lighter" />
				<dl className="flex justify-between text-[15px] leading-5.5">
					<dt className="font-medium text-light">대상 고객</dt>
					<dd className="text-lighter">{tier.target}</dd>
				</dl>
			</div>
		</article>
	);
};
