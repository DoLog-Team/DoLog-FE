import Link from "next/link";
import { Title } from "@/components/common/Title/Title";
import Banner from "./_components/Banner";
import ExhibitionCard from "./_components/ExhibitionCard";
import { Header } from "./_components/Header";
import { MOCK_BANNERS } from "./_mocks/banner";
import { MOCK_EXHIBITIONS } from "./_mocks/exhibition";

export default function MainPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <Banner banners={MOCK_BANNERS} />

      <section className="flex flex-col px-4 pt-6">
        <Title title="진행중인 전시회" />
        <div className="flex flex-col gap-4 mt-4">
          {MOCK_EXHIBITIONS.map((exhibition) => (
            <Link
              key={exhibition.id}
              href={`/exhibition/${exhibition.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExhibitionCard {...exhibition} />
            </Link>
          ))}
        </div>
        <Link
          href="/exhibitions"
          className="bg-fg-lighter text-body2 text-light text-center py-4 rounded-lg mt-7"
        >
          더보기
        </Link>
      </section>
    </div>
  );
}
