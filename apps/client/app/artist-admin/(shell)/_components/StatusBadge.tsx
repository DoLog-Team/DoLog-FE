import { cn } from "@/lib/utils/cn";
import type { ArtworkStatus } from "../_mocks/artworks";

// (A) 색 규칙표
// 색 이름마다 "뱃지일 때 클래스"와 "글자일 때 클래스"를 갖도록 함
export const STATUS_TONE = {
	default: { badge: "bg-fg-lighter text-light", text: "text-light" },
	light: { badge: "bg-fg-light text-light", text: "text-light" },
	coral: { badge: "bg-admin2 text-admin1", text: "text-admin1" },
} as const;

export type StatusTone = keyof typeof STATUS_TONE;

// (B) 작품 상태 → 색 이름 연결
const ARTWORK_STATUS: Record<ArtworkStatus, { label: string; tone: StatusTone }> = {
	draft: { label: "임시저장", tone: "coral" },
	public: { label: "공개", tone: "light" },
	private: { label: "비공개", tone: "light" },
};

interface StatusBadgeProps {
	label: string;
	tone?: StatusTone;
}

export function StatusBadge({ label, tone = "default" }: StatusBadgeProps) {
	return (
		<span
			className={cn(
				"flex items-center rounded-sm px-1.5 py-1 text-body4-bold",
				STATUS_TONE[tone].badge,
			)}
		>
			{label}
		</span>
	);
}

// (C) 작품 상태(임시저장·공개·비공개) 뱃지
// 작품 상태에 따라 색과 라벨이 자동으로 붙음
export function ArtworkStatusBadge({ status }: { status: ArtworkStatus }) {
	return <StatusBadge {...ARTWORK_STATUS[status]} />;
}
