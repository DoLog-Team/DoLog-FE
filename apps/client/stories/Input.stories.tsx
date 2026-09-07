import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/common/Input/Input";

const meta = {
	title: "UI/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "boolean" },
		disabled: { control: "boolean" },
		maxLength: { control: "number" },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: "홍길동" },
};

export const WithCounter: Story = {
	args: { placeholder: "홍길동", maxLength: 10 },
};

export const ErrorState: Story = {
	args: { placeholder: "홍길동", error: true, defaultValue: "잘못된 값" },
};

export const Disabled: Story = {
	args: { placeholder: "홍길동", disabled: true },
};

export const AllStates: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-80">
			<Input placeholder="기본" />
			<Input placeholder="글자수 카운터" maxLength={10} />
			<Input placeholder="에러" error defaultValue="잘못된 값" />
			<Input placeholder="비활성" disabled />
		</div>
	),
};
