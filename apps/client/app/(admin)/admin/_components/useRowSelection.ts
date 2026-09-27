import { useState } from "react";

export const useRowSelection = <Id extends string | number>() => {
	const [selectedIds, setSelectedIds] = useState<Set<Id>>(new Set());

	const isSelected = (id: Id) => selectedIds.has(id);

	const toggle = (id: Id) =>
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});

	const isAllSelected = (ids: Id[]) => ids.length > 0 && ids.every((id) => selectedIds.has(id));

	// 전부 선택돼 있으면 해제, 아니면 넘겨받은 목록 전체를 선택
	const toggleAll = (ids: Id[]) => setSelectedIds(isAllSelected(ids) ? new Set() : new Set(ids));

	const clear = () => setSelectedIds(new Set());

	return {
		selectedIds: [...selectedIds],
		count: selectedIds.size,
		isSelected,
		toggle,
		isAllSelected,
		toggleAll,
		clear,
	};
};

export type RowSelection<Id extends string | number = number> = ReturnType<
	typeof useRowSelection<Id>
>;
