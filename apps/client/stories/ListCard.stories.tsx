import type { Meta, StoryObj } from "@storybook/react";
import { ListCard } from "@/components/common/Card/ListCard/ListCard";

const meta = {
	title: "UI/ListCard",
	component: ListCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div style={{ width: "200px" }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		imageUrl: { control: "text" },
		title: { control: "text" },
		category: { control: "text" },
		author: { control: "text" },
	},
} satisfies Meta<typeof ListCard>;

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

export const WithoutCategory: Story = {
	args: {
		imageUrl: "https://picsum.photos/400/300",
		title: "작품 제목",
		author: "홍길동",
	},
};
