import { Button } from "@/components/common/Button/Button";
import { ChevronIcon } from "@/components/common/icons/ChevronIcon";
import { cn } from "@/lib/utils/cn";

const PAGE_GROUP_SIZE = 10;

interface PaginationProps {
	page: number;
	totalPages: number;
	onChange: (page: number) => void;
	className?: string;
}

export const Pagination = ({ page, totalPages, onChange, className }: PaginationProps) => {
	const groupStart = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
	const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
	const pages = Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);
	const isFirst = page <= 1;
	const isLast = page >= totalPages;

	return (
		<nav aria-label="페이지" className={cn("flex items-center justify-end gap-2", className)}>
			<Button
				variant="outline"
				size="xs"
				iconOnly
				disabled={isFirst}
				onClick={() => onChange(page - 1)}
				aria-label="이전 페이지"
				className="p-0 disabled:cursor-not-allowed"
			>
				<ChevronIcon
					direction="left"
					className={isFirst ? "text-icon-lighter" : "text-icon-light"}
				/>
			</Button>
			{pages.map((pageNumber) => (
				<Button
					key={pageNumber}
					variant={pageNumber === page ? "primary" : "assistive"}
					size="xs"
					onClick={() => onChange(pageNumber)}
					aria-current={pageNumber === page ? "page" : undefined}
				>
					{pageNumber}
				</Button>
			))}
			<Button
				variant="outline"
				size="xs"
				iconOnly
				disabled={isLast}
				onClick={() => onChange(page + 1)}
				aria-label="다음 페이지"
				className="p-0 disabled:cursor-not-allowed"
			>
				<ChevronIcon
					direction="right"
					className={isLast ? "text-icon-lighter" : "text-icon-light"}
				/>
			</Button>
		</nav>
	);
};
