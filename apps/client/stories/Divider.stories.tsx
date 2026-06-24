import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@/components/common/Divider/Divider";

const meta = {
	title: "UI/Divider",
	component: Divider,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		spacing: {
			control: "select",
			options: ["none", "sm", "md", "lg"],
		},
		thickness: {
			control: "select",
			options: ["thin", "medium", "thick"],
		},
		color: {
			control: "select",
			options: ["lightest", "lighter"],
		},
		fullBleed: { control: "boolean" },
	},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const AllVariants: Story = {
	render: () => (
		<div className="px-4 flex flex-col gap-4 py-4">
			<p className="text-body2 text-lighter">thin</p>
			<Divider thickness="thin" spacing="none" fullBleed={false} />
			<p className="text-body2 text-lighter">medium</p>
			<Divider thickness="medium" spacing="none" fullBleed={false} />
			<p className="text-body2 text-lighter">thick</p>
			<Divider thickness="thick" spacing="none" fullBleed={false} />
			<p className="text-body2 text-lighter">fullBleed</p>
			<Divider thickness="thick" spacing="none" fullBleed={true} />
		</div>
	),
};
