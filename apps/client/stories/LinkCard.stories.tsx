import type { Meta, StoryObj } from "@storybook/react";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";

const meta = {
	title: "UI/LinkCard",
	component: LinkCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div style={{ width: "320px" }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [
			{ label: "email", value: "hong@example.com", type: "email" },
			{ label: "instagram", value: "@hong_artist", type: "text" },
			{ label: "Behance", value: "https://behance.net/hong", type: "url" },
		],
	},
};
