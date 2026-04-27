import { Title } from "@/components/common/Title/Title";

export const DescriptionSection = ({
	content,
	exhibitionTitle,
}: {
	content: string;
	exhibitionTitle: string;
}) => (
	<section className="flex flex-col px-4 pb-6">
		<Title title={exhibitionTitle} />
		<p className="whitespace-pre-wrap leading-relaxed text-body1">{content}</p>
	</section>
);
