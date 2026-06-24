import type { Meta, StoryObj } from "@storybook/react";
import { RowCard } from "@/components/common/Card/RowCard/RowCard";

const meta = {
	title: "UI/RowCard",
	component: RowCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		imageUrl: { control: "text" },
		name: { control: "text" },
		engName: { control: "text" },
		email: { control: "text" },
	},
} satisfies Meta<typeof RowCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	args: {
		imageUrl: "https://picsum.photos/72/96",
		name: "홍길동",
		engName: "Hong Gil-dong",
		email: "hong@example.com",
	},
};

export const WithoutImage: Story = {
	args: {
		name: "홍길동",
		engName: "Hong Gil-dong",
		email: "hong@example.com",
	},
};
