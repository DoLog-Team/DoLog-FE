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
		onNotificationClick: () => {},
	},
} satisfies Meta<typeof NotificationSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		notifications: [
			{
				id: "1",
				type: "ARTIST_JOIN_APPROVED",
				payload: { exhibitionName: "제 28회 졸업전시회" },
				referenceId: "exhibition-1",
				createdAt: hoursAgo(2),
				isRead: false,
			},
			{
				id: "2",
				type: "ARTWORK_HIDDEN",
				payload: { exhibitionName: "제 28회 졸업전시회", artworkTitle: "오후 6시의 고요함" },
				referenceId: "exhibition-1",
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
