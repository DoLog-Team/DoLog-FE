import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";

const meta = {
	title: "UI/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	args: {
		checked: false,
		onChange: () => {},
		label: "시작 날짜 입력하기",
	},
	argTypes: {
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Checkbox {...args} checked={checked} onChange={setChecked} />;
	},
};

export const Disabled: Story = {
	args: { disabled: true },
};
