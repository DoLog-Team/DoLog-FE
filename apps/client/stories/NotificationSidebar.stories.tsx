import type { Meta, StoryObj } from "@storybook/react";
import { NotificationSidebar } from "@/components/common/NotificationSidebar/NotificationSidebar";

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const meta = {
	title: "UI/NotificationSidebar",
	component: NotificationSidebar,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			story: { inline: false, height: "600px" },
		},
	},
	args: {
		open: true,
		onOpenChange: () => {},
	},
} satisfies Meta<typeof NotificationSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		notifications: [
			{
				id: 1,
				title: "알림명",
				description: "설명",
				createdAt: hoursAgo(2),
				isRead: false,
			},
			{
				id: 2,
				title: "알림명",
				description: "설명",
				createdAt: hoursAgo(30),
				isRead: true,
			},
		],
	},
};

export const Empty: Story = {
	args: {
		notifications: [],
	},
};
