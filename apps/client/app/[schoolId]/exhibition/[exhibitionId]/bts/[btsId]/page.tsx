"use client";

import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BTSCardGrid } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import { Divider } from "@/components/common/Divider/Divider";
import { Modal } from "@/components/common/Modal/Modal";
import { Title } from "@/components/common/Title/Title";
import { MOCK_WORK_DATA } from "@/constants/work";
import { Header } from "../../_components/Header";
import { MOCK_BEHIND_THE_SCENE } from "../_mocks/behind-the-scene";

const TABS = [
  { id: "artist", label: "작가 소개" },
  { id: "related", label: "연관 작품" },
] as const;

export default function BtsDetailPage() {
  const params = useParams();

  const schoolId = Array.isArray(params.schoolId)
    ? params.schoolId[0]
    : params.schoolId;
  const exhibitionId = Array.isArray(params.exhibitionId)
    ? params.exhibitionId[0]
    : params.exhibitionId;
  const btsId = Number(
    Array.isArray(params.btsId) ? params.btsId[0] : params.btsId,
  );

  const artistRef = useRef<HTMLElement>(null);
  const relatedRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"artist" | "related">("artist");
  const [isSnsModalOpen, setIsSnsModalOpen] = useState(false);

  const btsIndex = MOCK_BEHIND_THE_SCENE.findIndex((item) => item.id === btsId);
  const btsItem = MOCK_BEHIND_THE_SCENE[btsIndex];

  const relatedBts = btsItem
    ? MOCK_BEHIND_THE_SCENE.filter(
        (item) => item.author === btsItem.author && item.id !== btsId,
      ).slice(0, 3)
    : [];

  useEffect(() => {
    const refs = [
      { id: "artist" as const, ref: artistRef },
      { id: "related" as const, ref: relatedRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tab = refs.find((r) => r.ref.current === entry.target);
            if (tab) setActiveTab(tab.id);
          }
        });
      },
      { rootMargin: "-44px 0px -60% 0px", threshold: 0 },
    );

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const HEADER_HEIGHT = 44;

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    const top =
      ref.current.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!btsItem) return null;

  return (
    <div className="flex flex-col min-h-screen pb-14">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-normal">
        <Header variant="back" title="Behind The Scene 상세" />
      </div>

      {/* 대표 이미지 */}
      <div className="relative aspect-video w-full">
        <Image
          src={btsItem.imageUrl}
          alt={btsItem.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col px-4">
        {/* BTS 제목 */}
        <Title title="졸업 전시를 준비하며" size="head1" />

        {/* SNS 링크 */}
        {btsItem.sns && (
          <>
            <Button
              type="button"
              variant="assistive"
              size="md"
              className="w-full gap-2 text-element2 mt-2.5 mb-6"
              onClick={() => setIsSnsModalOpen(true)}
            >
              <Image
                src="/images/bts/instagram.png"
                alt={btsItem.sns.platform}
                width={24}
                height={24}
              />
              {btsItem.sns.platform}에서 확인하기
            </Button>
            <Modal
              open={isSnsModalOpen}
              onOpenChange={setIsSnsModalOpen}
              title="외부 링크로 이동해요."
              description={`Behind The Scene 앱을 위해\n${btsItem.sns.platform}으로 이동해요.`}
              actions={[
                {
                  text: "되돌리기",
                  variant: "secondary",
                  onClick: () => setIsSnsModalOpen(false),
                },
                {
                  text: "이동하기",
                  variant: "primary",
                  onClick: () => {
                    window.open(btsItem.sns!.url, "_blank", "noopener,noreferrer");
                    setIsSnsModalOpen(false);
                  },
                },
              ]}
            />
          </>
        )}

        {/* 작가 소개 */}
        <section ref={artistRef}>
          <Title title="작가 소개" size="head2" />
          <ProfileCard
            imageUrl={btsItem.authorImageUrl}
            name={btsItem.author}
            engName={btsItem.authorEngName}
            bio={btsItem.bio}
          />
          <div className="mt-4">
            <LinkCard
              items={
                btsItem.authorSns?.map((s) => ({
                  label: s.platform,
                  value: s.url,
                })) ?? []
              }
            />
            <Link
              href={`/${schoolId}/exhibition/${exhibitionId}/artist/${btsItem.artistId}`}
            >
              <Button variant="outline" size="sm" className="w-full mt-5 mb-4">
                프로필 더보기
              </Button>
            </Link>
          </div>
        </section>

        <Divider />

        {/* 연관 작품 */}
        <section ref={relatedRef} className="pb-6">
          <Title title="연관 작품" size="head2" className="mt-4 mb-4" />
          <ListCardGrid items={MOCK_WORK_DATA} limit={3} />
        </section>

        <Divider />

        {/* 추천 Behind The Scene */}
        {relatedBts.length > 0 && (
          <section className="mb-6">
            <Title
              title="추천 Behind The Scene"
              size="head2"
              className="mt-4 mb-4"
            />
            <BTSCardGrid
              items={relatedBts}
              getHref={(item) =>
                `/${schoolId}/exhibition/${exhibitionId}/bts/${item.id}`
              }
            />
          </section>
        )}
      </div>

      {/* 하단 고정 탭바 */}
      <div className="fixed bottom-0 px-4 w-full max-w-135 z-20 flex border-t border-stroke-lightest bg-normal">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              scrollTo(tab.id === "artist" ? artistRef : relatedRef);
            }}
            className={` px-2.5 py-3 text-body2 transition-colors ${
              activeTab === tab.id
                ? "text-body2-bold text-light border-t-2 border-stroke-inverse -mt-0.5"
                : "text-lightest text-body2 "
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
