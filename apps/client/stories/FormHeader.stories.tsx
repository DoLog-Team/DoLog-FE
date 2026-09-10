import type { Meta, StoryObj } from "@storybook/react";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";

const meta = {
	title: "UI/FormHeader",
	component: FormHeader,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		title: "프로필 정보 수정",
		lastSavedAt: "2026.05.12 19:22",
		onTempSave: () => {},
		onBack: () => {},
	},
} satisfies Meta<typeof FormHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {};

export const ArtworkTitleEditable: Story = {
	args: {
		title: "작품 이름이 표시됨",
		editableTitle: true,
		onTitleEditClick: () => {},
	},
};

export const ArtworkSubmission: Story = {
	args: {
		title: "농담곰 자화상",
	},
};
