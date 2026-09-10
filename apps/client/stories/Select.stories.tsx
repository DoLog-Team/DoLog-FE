import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "@/components/common/Select/Select";

const GROUP_OPTIONS = [
	{ label: "검색어 추천 아이템", value: "1" },
	{ label: "검색어 추천 아이템", value: "2" },
	{ label: "검색어 추천 아이템", value: "3" },
];

const meta = {
	title: "UI/Select",
	component: Select,
	tags: ["autodocs"],
	args: {
		options: GROUP_OPTIONS,
		onChange: () => {},
		placeholder: "그룹을 선택해주세요.",
	},
	argTypes: {
		error: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | undefined>(undefined);
		return (
			<div className="w-80">
				<Select {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};

export const WithValue: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | undefined>("1");
		return (
			<div className="w-80">
				<Select {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};

export const Disabled: Story = {
	args: { disabled: true },
	render: (args) => (
		<div className="w-80">
			<Select {...args} />
		</div>
	),
};

const EXHIBITION_OPTIONS = [
	{ label: "전시 1", value: "1" },
	{ label: "전시 2", value: "2" },
];

export const WithAction: Story = {
	args: {
		options: EXHIBITION_OPTIONS,
		actionLabel: "새로운 전시 입장하기",
		onActionClick: () => alert("입장 코드 입력 모달 열기"),
	},
	render: (args) => {
		const [value, setValue] = useState<string | undefined>(undefined);
		return (
			<div className="w-80">
				<Select {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};
