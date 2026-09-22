import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";

const meta = {
	title: "UI/FormField",
	component: FormField,
	tags: ["autodocs"],
	args: {
		label: "카테고리",
		children: null,
	},
	argTypes: {
		required: { control: "boolean" },
	},
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="w-80">
			<FormField {...args}>
				<Input placeholder="입력해주세요." />
			</FormField>
		</div>
	),
};

export const Required: Story = {
	args: { required: true },
	render: (args) => (
		<div className="w-80">
			<FormField {...args}>
				<Input placeholder="입력해주세요." />
			</FormField>
		</div>
	),
};
