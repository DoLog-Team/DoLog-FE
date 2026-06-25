import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";

const meta = {
	title: "UI/ScrollTabBar",
	component: ScrollTabBar,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof ScrollTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const TABS = [
	{ id: "intro", label: "전시 소개" },
	{ id: "artwork", label: "전시물" },
	{ id: "artist", label: "참여한 사람" },
	{ id: "bts", label: "Behind The Scene" },
] as const;

export const Default: Story = {
	args: {
		tabs: TABS,
		activeTab: "intro",
		onTabClick: () => {},
	},
};

export const Interactive: Story = {
	args: {
		tabs: TABS,
		activeTab: "intro",
		onTabClick: () => {},
	},
	render: (args) => {
		const [activeTab, setActiveTab] = useState("intro");
		return <ScrollTabBar {...args} activeTab={activeTab} onTabClick={setActiveTab} />;
	},
};
