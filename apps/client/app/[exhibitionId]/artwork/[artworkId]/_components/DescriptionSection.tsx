import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";

export const DescriptionSection = ({ content }: { content: string }) => (
	<section className="flex flex-col pb-6">
		<DesktopContainer>
			<Title title="작품 소개" margin="compact" />
			<p className="whitespace-pre-wrap leading-relaxed text-body1">{content}</p>
		</DesktopContainer>
	</section>
);
