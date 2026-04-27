"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";
import { Header } from "../../_components/Header";
import type { BehindTheSceneItem } from "../_mocks/behind-the-scene";

interface BehindTheSceneClientProps {
  items: BehindTheSceneItem[];
}

const COLLAPSE_THRESHOLD = 150;
const EXPAND_THRESHOLD = 20;

export default function BehindTheSceneClient({
  items,
}: BehindTheSceneClientProps) {
  const params = useParams();
  const schoolId = Array.isArray(params.schoolId)
    ? params.schoolId[0]
    : params.schoolId;
  const exhibitionId = Array.isArray(params.exhibitionId)
    ? params.exhibitionId[0]
    : params.exhibitionId;

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => {
        if (!prev && y > COLLAPSE_THRESHOLD) return true;
        if (prev && y < EXPAND_THRESHOLD) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = items.filter(
    (item) =>
      !searchQuery ||
      item.title.includes(searchQuery) ||
      item.author.includes(searchQuery),
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-normal">
        <Header />

        {/* 스크롤 전에만 보이는 타이틀 + 서브타이틀 */}
        <div
          className={`px-4 overflow-hidden transition-all duration-200 mb-3 ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          }`}
        >
          <Title title="Behind The Scene" />
          <p className="text-body2 text-light">
            작품의 제작 과정을 확인할 수 있습니다.
          </p>
        </div>

        {/* 검색바 */}
        <div className="px-4 pb-2">
          <SearchBar
            placeholder="제목 혹은 작가명을 검색해요."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>

      {/* 카드 목록 */}
      <section className="flex flex-col flex-1 px-4 pt-4 pb-6">
        {filtered.length > 0 ? (
          <ListCardGrid
            items={filtered}
            getHref={(item) =>
              `/${schoolId}/exhibition/${exhibitionId}/bts/${item.id}`
            }
            className="gap-y-10"
          />
        ) : (
          <EmptyState
            searchQuery={searchQuery}
            message="등록된 Behind The Scene이 없어요."
          />
        )}
      </section>
    </div>
  );
}
