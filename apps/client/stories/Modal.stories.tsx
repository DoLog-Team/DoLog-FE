import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { Select } from "@/components/common/Select/Select";

const meta = {
	title: "UI/Modal",
	component: Modal,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			story: { inline: false, height: "300px" },
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: true,
		title: "모달입니다.",
		description: "모달 상세 설명을 작성해주세요.\n두줄까지 작성하면 보기 좋습니다.",
		actions: [
			{ text: "취소", onClick: () => {}, variant: "assistive" },
			{ text: "확인", onClick: () => {} },
		],
	},
};

export const TitleOnly: Story = {
	args: {
		open: true,
		title: "정말 삭제하시겠습니까?",
		actions: [
			{ text: "취소", onClick: () => {}, variant: "assistive" },
			{ text: "삭제", onClick: () => {} },
		],
	},
};

export const Interactive: Story = {
	args: {
		title: "모달 제목",
		description: "모달 설명이 들어갑니다.",
		actions: [{ text: "확인", onClick: () => {} }],
	},
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>모달 열기</Button>
				<Modal {...args} open={open} onOpenChange={setOpen} />
			</>
		);
	},
};

// 인풋을 children으로 넣는 폼 모달 (모달 명세서 #6 전시 참여하기)
export const WithInput: Story = {
	args: {
		title: "전시 참여하기",
		description: "참여하려는 전시의 입장 코드를 입력해주세요.",
		showCloseButton: true,
		actions: [],
	},
	render: (args) => {
		const [open, setOpen] = useState(true);
		const [code, setCode] = useState("");
		return (
			<Modal
				{...args}
				open={open}
				onOpenChange={setOpen}
				actions={[
					{ text: "취소", onClick: () => setOpen(false), variant: "assistive" },
					{
						text: "입장하기",
						onClick: () => setOpen(false),
						variant: "primary",
						disabled: !code.trim(),
					},
				]}
			>
				<Input
					value={code}
					onChange={(e) => setCode(e.target.value)}
					placeholder="코드를 입력해주세요."
				/>
			</Modal>
		);
	},
};

// select를 children으로 넣는 모달 (모달 명세서 #22 작품 그룹 지정)
export const WithSelect: Story = {
	args: {
		title: "그룹 지정하기",
		description: "선택한 12개의 작품의 그룹을 선택해주세요.",
		showCloseButton: true,
		actions: [],
	},
	render: (args) => {
		const [open, setOpen] = useState(true);
		const [zone, setZone] = useState("");
		return (
			<Modal
				{...args}
				open={open}
				onOpenChange={setOpen}
				actions={[
					{ text: "취소", onClick: () => setOpen(false), variant: "assistive" },
					{ text: "저장하기", onClick: () => setOpen(false), variant: "primary", disabled: !zone },
				]}
			>
				<Select
					value={zone}
					onChange={setZone}
					placeholder="그룹을 선택해주세요."
					options={[
						{ label: "A 구역", value: "a" },
						{ label: "B 구역", value: "b" },
					]}
				/>
			</Modal>
		);
	},
};

// 버튼이 하나뿐인 안내 모달 (모달 명세서 #28 로그인 실패)
export const SingleAction: Story = {
	args: {
		open: true,
		title: "로그인에 실패했어요.",
		description: "로그인에 실패했어요.\n잠시 뒤 다시 시도해주세요.",
		showCloseButton: true,
		actions: [{ text: "확인", onClick: () => {}, variant: "assistive" }],
	},
};

// 설명 없이 인풋만 있는 모달 (모달 명세서 #16 작품 이름 변경)
export const RenameArtwork: Story = {
	args: {
		title: "작품 이름 변경",
		showCloseButton: true,
		actions: [],
	},
	render: (args) => {
		const [open, setOpen] = useState(true);
		const [name, setName] = useState("");
		const original = "농담곰 자화상";
		return (
			<Modal
				{...args}
				open={open}
				onOpenChange={setOpen}
				actions={[
					{ text: "취소", onClick: () => setOpen(false), variant: "assistive" },
					{
						text: "변경하기",
						onClick: () => setOpen(false),
						variant: "primary",
						disabled: !name.trim() || name === original,
					},
				]}
			>
				<Input value={name} onChange={(e) => setName(e.target.value)} placeholder={original} />
			</Modal>
		);
	},
};

// 경고 타입 - 제목과 주요 버튼이 빨강 (모달 명세서 #13 작품 삭제)
export const Danger: Story = {
	args: {
		open: true,
		title: "작품 삭제하기",
		description:
			"농담곰 자화상이 작가 프로필과 참여 중인 전시에서 모두 삭제돼요. 삭제한 작품은 복구할 수 없습니다.",
		titleTone: "danger",
		showCloseButton: true,
		actions: [
			{ text: "취소", onClick: () => {}, variant: "assistive" },
			{ text: "삭제하기", onClick: () => {}, variant: "danger" },
		],
	},
};
