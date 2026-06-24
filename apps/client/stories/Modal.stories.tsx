import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "components";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";

const meta = {
	title: "UI/Modal",
	component: Modal,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			story: { inline: false, height: "300px" },
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: true,
		title: "모달입니다.",
		description: "모발 상세 설명을 작성해주세요.\n두줄까지 작성하면 보기 좋습니다.",
		actions: [
			{ text: "취소", onClick: () => {}, variant: "secondary" },
			{ text: "확인", onClick: () => {} },
		],
	},
};

export const TitleOnly: Story = {
	args: {
		open: true,
		title: "정말 삭제하시겠습니까?",
		actions: [
			{ text: "취소", onClick: () => {}, variant: "secondary" },
			{ text: "삭제", onClick: () => {} },
		],
	},
};

export const Interactive: Story = {
	args: {
		title: "모달 제목",
		description: "모달 설명이 들어갑니다.",
		actions: [{ text: "확인", onClick: () => {} }],
	},
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>모달 열기</Button>
				<Modal {...args} open={open} onOpenChange={setOpen} />
			</>
		);
	},
};
