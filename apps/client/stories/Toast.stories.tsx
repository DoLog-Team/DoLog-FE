import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Toast } from "@/components/common/Toast/Toast";

const meta = {
	title: "UI/Toast",
	component: Toast,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			story: { inline: false, height: "200px" },
		},
	},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: true,
		message: "복사를 성공했어요.",
	},
};

export const Interactive: Story = {
	args: {
		open: false,
		message: "복사를 성공했어요.",
	},
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>토스트 띄우기</Button>
				<Toast {...args} open={open} onClose={() => setOpen(false)} />
			</>
		);
	},
};
