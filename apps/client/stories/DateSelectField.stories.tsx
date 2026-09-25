import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateSelectField } from "@/components/common/DateSelectField/DateSelectField";

const YEAR_OPTIONS = Array.from({ length: 27 }, (_, i) => {
	const year = String(2000 + i);
	return { label: year, value: year };
});

const meta = {
	title: "UI/DateSelectField",
	component: DateSelectField,
	tags: ["autodocs"],
	args: {
		label: "종료 년도",
		placeholder: "2000",
		options: YEAR_OPTIONS,
		value: undefined,
		onChange: () => {},
	},
	argTypes: {
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof DateSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | undefined>(undefined);
		return (
			<div className="w-40">
				<DateSelectField {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};

export const Disabled: Story = {
	args: { disabled: true },
	render: (args) => (
		<div className="w-40">
			<DateSelectField {...args} value={undefined} />
		</div>
	),
};
