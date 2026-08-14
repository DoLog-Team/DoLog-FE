import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/common/Button/Button";

const meta = {
	title: "UI/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "assistive", "outline", "main", "cta"],
		},
		size: {
			control: "select",
			options: ["lg", "md", "sm", "xs"],
		},
		round: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: { variant: "primary", size: "md", children: "버튼" },
};

export const Assistive: Story = {
	args: { variant: "assistive", size: "md", children: "버튼" },
};

export const Outline: Story = {
	args: { variant: "outline", size: "md", children: "버튼" },
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-3">
			{(["primary", "assistive", "outline"] as const).map((variant) =>
				(["lg", "md", "sm", "xs"] as const).map((size) => (
					<Button key={`${variant}-${size}`} variant={variant} size={size}>
						{variant} {size}
					</Button>
				)),
			)}
		</div>
	),
};
