import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination/Pagination";

const meta = {
	title: "UI/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	args: {
		page: 1,
		totalPages: 13,
		onChange: () => {},
	},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [page, setPage] = useState(args.page);
		return <Pagination {...args} page={page} onChange={setPage} />;
	},
};

export const SinglePage: Story = {
	args: { totalPages: 1 },
};
