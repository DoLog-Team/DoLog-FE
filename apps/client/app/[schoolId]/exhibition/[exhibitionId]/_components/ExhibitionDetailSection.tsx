import { Exhibition } from "@/constants/exhibition";
import { Title } from "@/components/common/Title/Title";

interface ExhibitionDetailProps {
  exhibition: Exhibition;
}

export function ExhibitionDetail({ exhibition }: ExhibitionDetailProps) {
  
  // mockdata상 description에 \n이 있으면 단락 분리 
  // TODO : 백에서 오는 실제 데이터 개행 방식에 따라 수정 예정
  const paragraphs = exhibition.description.split("\n\n").filter(Boolean);

  return (
    <section className="flex flex-col px-4 pb-6">
      <Title title="전시 소개"/>
      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-body1">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
