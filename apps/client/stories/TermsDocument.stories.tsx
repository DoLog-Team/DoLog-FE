import type { Meta, StoryObj } from "@storybook/react";
import { TermsDocument } from "@/components/common/TermsDocument/TermsDocument";

const meta = {
	title: "UI/TermsDocument",
	component: TermsDocument,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div className="max-w-150 break-keep text-body2 text-light">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof TermsDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		blocks: [
			{
				type: "paragraph",
				text: "두록은 아래와 같이 개인정보를 수집·이용합니다.",
			},
			{
				type: "table",
				rows: [
					{
						label: "수집 항목",
						value:
							"**작가 회원:** 이메일, 사용자 성명\n**이용기관 담당자:** 소속 대학, 담당자 성명",
					},
					{ label: "보유·이용 기간", value: "회원 탈퇴 시 지체 없이 파기" },
				],
			},
			{
				type: "notice",
				texts: [
					"※ 본 항목은 선택 사항으로, 동의를 거부하셔도 서비스 이용에 제한이 없습니다.",
					"자세한 사항은 [[개인정보 처리방침]](#)에서 확인하실 수 있습니다.",
				],
			},
		],
	},
};
