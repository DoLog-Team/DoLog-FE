interface EmptyStateProps {
	searchQuery?: string;
	message?: string;
}

export const EmptyState = ({
	searchQuery,
	message = "해당하는 결과가 없어요.",
}: EmptyStateProps) => {
	const truncated =
		searchQuery && searchQuery.length > 8 ? `${searchQuery.slice(0, 8)}...` : searchQuery;

	return (
		<div className="flex flex-col items-center justify-center py-20 gap-1 text-center text-body1 text-lightest">
			{searchQuery ? (
				<>
					<p>&lsquo;{truncated}&rsquo;에 대한 검색 결과가 없어요.</p>
					<p>다른 내용을 검색해보세요.</p>
				</>
			) : (
				<p>{message}</p>
			)}
		</div>
	);
};
