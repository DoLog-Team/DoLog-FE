import type { Meta, StoryObj } from "@storybook/react";
import { LoadingScreen } from "@/components/common/Spinner/LoadingScreen";
import { Spinner } from "@/components/common/Spinner/Spinner";

const meta = {
	title: "UI/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		color: { control: "color" },
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { color: "#FFEB01" },
};

export const WithExhibitionColor: Story = {
	args: { color: "var(--btn-text)" },
};

export const Loading: StoryObj<typeof LoadingScreen> = {
	render: () => <LoadingScreen />,
};
