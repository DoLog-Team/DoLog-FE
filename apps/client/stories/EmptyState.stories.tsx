import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";

const meta = {
	title: "UI/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		message: { control: "text" },
		searchQuery: { control: "text" },
	},
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const CustomMessage: Story = {
	args: {
		message: "아직 등록된 작품이 없어요.",
	},
};

export const WithSearchQuery: Story = {
	args: {
		searchQuery: "홍길동",
	},
};
