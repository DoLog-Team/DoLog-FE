interface EmptyStateProps {
    message?: string;
}

export function EmptyState({ message = "선택한 카테고리에 해당되는 작품이 없어요." }: EmptyStateProps) {
    return (
        <div className="flex flex-col justify-center items-center w-full pb-16 pt-10 px-2.5">
            <p className="text-center text-body1 text-lightest max-w-43">{message}</p>
        </div>
    );
}