import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@/components/common/Chip/Chip";

const meta = {
	title: "UI/Chip",
	component: Chip,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["default", "primary", "assistive", "custom"],
		},
		selected: { control: "boolean" },
		label: { control: "text" },
	},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: "칩", type: "default", selected: false },
};

export const Selected: Story = {
	args: { label: "칩", type: "primary", selected: true },
};

export const AllTypes: Story = {
	args: { label: "칩", type: "default", selected: false },
	render: () => (
		<div className="flex flex-wrap gap-3">
			{(["default", "primary", "assistive"] as const).map((type) => (
				<Chip key={type} label={type} type={type} selected={type !== "default"} />
			))}
		</div>
	),
};
