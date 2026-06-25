import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterChip } from "@/components/common/FilterChip/FilterChip";

const meta = {
	title: "UI/FilterChip",
	component: FilterChip,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "전공",
		options: ["회화", "조소", "사진", "디자인"],
		selected: null,
		onSelect: () => {},
	},
};

export const Selected: Story = {
	args: {
		label: "전공",
		options: ["회화", "조소", "사진", "디자인"],
		selected: "회화",
		onSelect: () => {},
	},
};

export const Interactive: Story = {
	args: {
		label: "전공",
		options: ["회화", "조소", "사진", "디자인"],
		selected: "회화",
		onSelect: () => {},
	},
	render: () => {
		const [selected, setSelected] = useState<string | null>(null);
		return (
			<FilterChip
				label="전공"
				options={["회화", "조소", "사진", "디자인"]}
				selected={selected}
				onSelect={setSelected}
			/>
		);
	},
};
