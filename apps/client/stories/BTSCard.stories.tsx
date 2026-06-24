import type { Meta, StoryObj } from "@storybook/react";
import { BTSCard } from "@/components/common/Card/BTSCard/BTSCard";

const meta = {
	title: "UI/BTSCard",
	component: BTSCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		imageUrl: { control: "text" },
		title: { control: "text" },
		author: { control: "text" },
	},
} satisfies Meta<typeof BTSCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		imageUrl: "https://picsum.photos/64/64",
		title: "Behind The Scene 제목",
		author: "홍길동",
	},
};
