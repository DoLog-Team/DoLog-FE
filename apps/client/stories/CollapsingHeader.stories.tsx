import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CollapsingHeader } from "@/components/common/CollapsingHeader/CollapsingHeader";

const meta = {
	title: "UI/CollapsingHeader",
	component: CollapsingHeader,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof CollapsingHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "전시물",
		searchQuery: "",
		onSearchChange: () => {},
		searchPlaceholder: "전시물 검색",
	},
	render: () => {
		const [query, setQuery] = useState("");
		return (
			<CollapsingHeader
				title="전시물"
				searchQuery={query}
				onSearchChange={setQuery}
				searchPlaceholder="전시물 검색"
			/>
		);
	},
};
