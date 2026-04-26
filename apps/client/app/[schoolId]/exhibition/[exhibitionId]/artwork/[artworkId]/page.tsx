import Image from "next/image";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { InfoSection } from "./_components/section_components/InfoSection";
import { LocationSection } from "./_components/section_components/LocationSection";
import { DescriptionSection } from "./_components/section_components/DescriptionSection";
import { PhotoSection } from "./_components/section_components/PhotoSection";
import { ArtistSection } from "./_components/section_components/ArtistSection";
import { BtsSection } from "./_components/section_components/BtsSection";
import { RelatedSection } from "./_components/section_components/RelatedSection";
import { MOCK_ARTWORK_DETAIL } from "@/app/(main)/_mocks/artworkDetail";


export default function ArtworkDetailPage() {
  const data = MOCK_ARTWORK_DETAIL; // 나중에 fetch로 교체

  return (
    <div className="flex flex-col">
        {/* 이미지 영역 */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
         {/* <Image src={data.image} alt={data.title} fill className="object-cover" /> */}
         <Image
            src="/public/images/artwork.png"
            alt="이미지"
            fill
            className="object-cover"
            priority
          />
      </div>

      <InfoSection data={data} />
      <LocationSection/>
      <DescriptionSection content={data.description} />
      {/*<PhotoSection images={data.images} />*/}
      <ArtistSection authors={data.authors} />
      <BtsSection bts={data.bts} />
      <RelatedSection category={data.category} />
    </div>
  );
}