import Image from "next/image";
import { Exhibition } from "@/constants/exhibition";
import { Title } from "@/components/common/Title/Title";

interface ExhibitionHostProps {
  hostInfo: Exhibition["hostInfo"];
  socialLinks?: Exhibition["socialLinks"];
}

export function ExhibitionHost({ hostInfo, socialLinks }: ExhibitionHostProps) {
  const paragraphs = hostInfo.description.split("\n\n").filter(Boolean);

  return (
    <section className="flex flex-col px-4 pb-6 mb-12">
      <Title title="주최 기관"/>
        
        {/* 이미지 */}
        {/* 이미지가 들어올 때만 렌더링 함 */}
        {hostInfo.imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden"> 
          <Image
            src={hostInfo.imageUrl}
            alt={hostInfo.name}
            fill
            className="object-cover"
          />
        </div>
        )}

        {/* 기관명 */}
        <span className="text-body1-bold mt-5 mb-4">
          {hostInfo.name}
        </span>
        
        {/* 기관 소개 */}
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-body1 leading-relaxed">
            {paragraph}
          </p>
        ))}

      {/* 소셜 링크 */}
      {socialLinks && (
        <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
          {socialLinks.behance && (
            <SocialLink label="behance" href={socialLinks.behance} />
          )}
          {socialLinks.instagram && (
            <SocialLink label="instagram" href={socialLinks.instagram} />
          )}
          {socialLinks.x && (
            <SocialLink label="X" href={socialLinks.x} />
          )}
        </div>
      )}
    </section>
  );
}

interface SocialLinkProps {
  label: string;
  href: string;
}

function SocialLink({ label, href }: SocialLinkProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-20 text-gray-400 flex-shrink-0">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 underline underline-offset-2 truncate"
      >
        {href}
      </a>
    </div>
  );
}
