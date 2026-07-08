import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/common/Card/Card";

const meta = {
	title: "UI/Card",
	component: Card,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		imageUrl: { control: "text" },
		title: { control: "text" },
		category: { control: "text" },
		author: { control: "text" },
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	args: {
		imageUrl: "https://picsum.photos/400/300",
		title: "작품 제목",
		category: "회화",
		author: "홍길동",
	},
};

export const WithoutImage: Story = {
	args: {
		title: "작품 제목",
		category: "조소",
		author: "홍길동",
	},
};
