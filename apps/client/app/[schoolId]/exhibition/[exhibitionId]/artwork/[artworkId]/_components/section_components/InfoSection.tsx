import { Title } from "@/components/common/Title/Title";
import { Chip } from "@/components/common/Chip/Chip";

interface InfoSectionProps {
  data: {
    title: string;
    category: string; // "생활 도자기" 등
    materials: string;
    size: string;
  };
}

export const InfoSection = ({ data }: InfoSectionProps) => {
  const categories = [data.category]; 

  return (
    <section className="flex flex-col px-4 pb-6">
      <div className="mt-6">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              type="assistive"
              selected={true}
            />
          ))}

        
        <Title title={data.title}/>
        <p className="text-body1"> {data.materials} | {data.size} </p>
      </div>
    </section>
  );
};