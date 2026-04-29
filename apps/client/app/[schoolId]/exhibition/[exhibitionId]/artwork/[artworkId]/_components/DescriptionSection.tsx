import { Title } from "@/components/common/Title/Title";

export const DescriptionSection = ({ content }: { content: string }) => (
	<section className="flex flex-col px-4 pb-6">
		<Title title="작품 소개" />
		<p className="whitespace-pre-wrap leading-relaxed text-body1">{content}</p>
	</section>
);
