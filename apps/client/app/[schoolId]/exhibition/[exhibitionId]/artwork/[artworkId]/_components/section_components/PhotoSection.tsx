interface PhotoSectionProps {
  images: string[];
}

export const PhotoSection = ({ images }: PhotoSectionProps) => {
  return (
    <section className="flex flex-col px-4 pb-6">
      {images.map((src, index) => (
        <div key={index} className="relative w-full bg-gray-50">
          {/* 이미지는 원본 비율을 유지하거나, 기획에 맞춰 높이를 조절하세요 */}
          <img 
            src={src} 
            alt={`작품 상세 이미지 ${index + 1}`} 
            className="w-full h-auto object-cover"
          />
          
          {/* Next.js Image 사용 시 (권장) */}
          {/* <div className="relative w-full aspect-[4/3]">
             <Image src={src} alt="상세이미지" fill className="object-cover" />
          </div> */}
        </div>
      ))}
    </section>
  );
};