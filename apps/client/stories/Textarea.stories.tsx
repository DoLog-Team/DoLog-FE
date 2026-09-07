import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/common/Textarea/Textarea";

const meta = {
	title: "UI/Textarea",
	component: Textarea,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "boolean" },
		disabled: { control: "boolean" },
		maxLength: { control: "number" },
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: "나를 잘 표현할 수 있는 소개문을 작성해요." },
};

export const WithCounter: Story = {
	args: { placeholder: "나를 잘 표현할 수 있는 소개문을 작성해요.", maxLength: 200 },
};

export const ErrorState: Story = {
	args: {
		placeholder: "나를 잘 표현할 수 있는 소개문을 작성해요.",
		error: true,
		defaultValue: "잘못된 값",
	},
};

export const Disabled: Story = {
	args: { placeholder: "나를 잘 표현할 수 있는 소개문을 작성해요.", disabled: true },
};

export const AllStates: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-80">
			<Textarea placeholder="기본" />
			<Textarea placeholder="글자수 카운터" maxLength={200} />
			<Textarea placeholder="에러" error defaultValue="잘못된 값" />
			<Textarea placeholder="비활성" disabled />
		</div>
	),
};
