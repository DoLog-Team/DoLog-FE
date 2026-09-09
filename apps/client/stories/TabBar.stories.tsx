import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TabBar } from "@/components/common/TabBar/TabBar";

const ARTWORK_TABS = [
	{ id: "basic", label: "기본 정보", badge: 2 },
	{ id: "image", label: "이미지" },
	{ id: "additional", label: "부가 정보" },
	{ id: "purchase", label: "구매 정보" },
	{ id: "detail", label: "상세 정보" },
];

const meta = {
	title: "UI/TabBar",
	component: TabBar,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArtworkForm: Story = {
	args: {
		tabs: ARTWORK_TABS,
		activeTab: "basic",
		onTabClick: () => {},
	},
};

export const Interactive: Story = {
	args: {
		tabs: ARTWORK_TABS,
		activeTab: "basic",
		onTabClick: () => {},
	},
	render: (args) => {
		const [activeTab, setActiveTab] = useState("basic");
		return <TabBar {...args} activeTab={activeTab} onTabClick={setActiveTab} />;
	},
};

export const ExhibitionSubmission: Story = {
	args: {
		tabs: [
			{ id: "exhibition", label: "전시" },
			{ id: "group", label: "그룹" },
			{ id: "additional", label: "부가 정보" },
		],
		activeTab: "exhibition",
		onTabClick: () => {},
	},
};
