import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";
import type { ArtworkGroup } from "../_mocks/exhibitionSettings";

export const MAX_GROUP_COUNT = 30;
const MAX_GROUP_NAME_LENGTH = 30;

// 저장을 막는 그룹 이름 오류 — 공백 · 중복
export const getGroupNameErrors = (groups: ArtworkGroup[]) =>
	groups.map((group, index) => {
		const name = group.name.trim();
		if (!name) return "그룹 이름을 입력해주세요.";
		const isDuplicate = groups.some(
			(other, otherIndex) => otherIndex !== index && other.name.trim() === name,
		);
		return isDuplicate ? "이미 있는 그룹 이름이에요." : undefined;
	});

interface GroupSettingsProps {
	groups: ArtworkGroup[];
	// 저장을 눌렀을 때만 오류 문구를 보여줌
	errors?: (string | undefined)[];
	onChange: (groups: ArtworkGroup[]) => void;
	onAdd: () => void;
}

export const GroupSettings = ({ groups, errors, onChange, onAdd }: GroupSettingsProps) => {
	const updateGroup = (id: string, patch: Partial<ArtworkGroup>) =>
		onChange(groups.map((group) => (group.id === id ? { ...group, ...patch } : group)));

	return (
		<div className="flex flex-col items-start gap-7">
			{groups.map((group, index) => (
				<div key={group.id} className="flex w-full gap-2">
					<button
						type="button"
						onClick={() => onChange(groups.filter(({ id }) => id !== group.id))}
						disabled={groups.length <= 1}
						aria-label={`${group.name || "그룹"} 삭제`}
						className="flex w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-fg-lighter disabled:cursor-not-allowed disabled:opacity-40"
					>
						<Image src="/icons/close.svg" alt="" width={20} height={20} />
					</button>
					<div className="flex min-w-0 flex-1 flex-col gap-2 min-[721px]:flex-row">
						<div className="flex min-w-0 flex-col gap-1 min-[721px]:flex-1">
							<label htmlFor={`${group.id}-name`} className="px-0.5 text-body3 text-light">
								그룹 이름
							</label>
							<Input
								id={`${group.id}-name`}
								value={group.name}
								onChange={(e) =>
									updateGroup(group.id, { name: e.target.value.slice(0, MAX_GROUP_NAME_LENGTH) })
								}
								placeholder="그룹 이름을 입력해주세요"
								error={Boolean(errors?.[index])}
								errorMessage={errors?.[index]}
							/>
						</div>
						<div className="flex min-w-0 flex-col gap-1 min-[721px]:flex-[1.5]">
							<label htmlFor={`${group.id}-description`} className="px-0.5 text-body3 text-light">
								그룹 설명
							</label>
							<Input
								id={`${group.id}-description`}
								value={group.description}
								onChange={(e) => updateGroup(group.id, { description: e.target.value })}
								placeholder="그룹 설명을 입력해주세요"
							/>
						</div>
					</div>
				</div>
			))}

			<Button
				type="button"
				variant="assistive"
				size="sm"
				onClick={onAdd}
				disabled={groups.length >= MAX_GROUP_COUNT}
				className="gap-1"
			>
				<Image src="/icons/plus.svg" alt="" width={20} height={20} />
				그룹 추가
			</Button>
		</div>
	);
};
