import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type SocialProvider = "kakao" | "google";

// 카카오·구글 브랜드 가이드 색상이라 디자인 토큰 대신 고정값을 사용함
const PROVIDER = {
	kakao: {
		label: "카카오로 계속하기",
		icon: "/icons/kakao.svg",
		className: "bg-[#fee500] text-black/85",
	},
	google: {
		label: "Google로 계속하기",
		icon: "/icons/google.svg",
		className: "border border-[#c2c2c2] text-light",
	},
} as const;

type SocialLoginButtonProps = {
	provider: SocialProvider;
	onClick?: () => void;
};

export const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
	const { label, icon, className } = PROVIDER[provider];

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex w-full cursor-pointer items-center justify-between rounded-lg px-4.5 py-3.5",
				className,
			)}
		>
			<Image src={icon} alt="" width={24} height={24} />
			<span className="px-0.5 text-body1-bold">{label}</span>
			<span className="h-6 w-3" aria-hidden />
		</button>
	);
};
