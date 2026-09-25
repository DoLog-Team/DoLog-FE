import type { Meta, StoryObj } from "@storybook/react";
import { AdminAuthHeader } from "@/components/common/AdminAuthHeader/AdminAuthHeader";

const meta = {
	title: "UI/AdminAuthHeader",
	component: AdminAuthHeader,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof AdminAuthHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
