import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";

const meta = {
	title: "UI/ProfileCard",
	component: ProfileCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		imageUrl: { control: "text" },
		name: { control: "text" },
		engName: { control: "text" },
		bio: { control: "text" },
	},
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	args: {
		imageUrl: "https://picsum.photos/150/200",
		name: "작가명",
		engName: "Jackga myeong",
		bio: "오랜 시간 제 곁을 지켜준 음악들, 그리고 그 순간순간을 함께해 준 여러분을 떠올리다 보니 문득 처음 무대에 섰던 마음이 다시금 떠오릅니다.\n그 시간들 속에서 우리는 지금과는 또 다른 설렘과 떨림, 그리고 기대감을 품고 매 순간을 차곡차곡 쌓아왔습니다.",
	},
};

export const WithoutImage: Story = {
	args: {
		imageUrl: "",
		name: "홍길동",
		engName: "Hong Gil-dong",
		bio: "서울대학교 미술대학 재학 중.",
	},
};

export const NameOnly: Story = {
	args: {
		imageUrl: "https://picsum.photos/150/200",
		name: "홍길동",
	},
};
