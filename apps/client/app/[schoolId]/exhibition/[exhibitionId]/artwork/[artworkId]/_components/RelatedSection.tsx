import { Title } from "@/components/common/Title/Title";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { MOCK_WORK_DATA } from "@/constants/work";

export const RelatedSection = ({ category }: { category: string }) => {
    const relatedArtworks = MOCK_WORK_DATA.filter((item) => item.category === category);

    return (
        <section className="flex flex-col px-4 pb-6">
            <Title title="동일한 카테고리 작품" />
            <CardGrid items={relatedArtworks} limit={2}/>
        </section>
    );
};