"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { FilterChip } from "@/components/common/FilterChip/FilterChip";
import ExhibitionCard, {
  type ExhibitionItem,
} from "../../_components/ExhibitionCard";
import MainFooter from "@/components/common/Footer/MainFooter";
import { Title } from "@/components/common/Title/Title";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";

interface ExhibitionsClientProps {
  exhibitions: ExhibitionItem[];
}

const SCROLL_THRESHOLD = 10;

export default function ExhibitionsClient({
  exhibitions,
}: ExhibitionsClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniv, setSelectedUniv] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const univs = [...new Set(exhibitions.map((e) => e.univName))];
  const depts = [...new Set(exhibitions.map((e) => e.deptName))];

  const filtered = exhibitions.filter((e) => {
    const matchSearch = e.title.includes(searchQuery);
    const matchUniv = !selectedUniv || e.univName === selectedUniv;
    const matchDept = !selectedDept || e.deptName === selectedDept;
    return matchSearch && matchUniv && matchDept;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-normal">
        <div
          className={`flex items-center gap-3 px-4 py-2.5 border-b ${isScrolled ? "border-transparent" : "border-stroke-lightest"}`}
        >
          <Link
            href="/"
            className="flex items-center justify-center w-6 h-6 shrink-0"
          >
            <img src="/icons/backBtn.svg" width={24} height={24} />
          </Link>
          <span
            className={`text-strong transition-opacity duration-200 ${
              isScrolled
                ? "opacity-100 text-body1-bold"
                : "opacity-0 text-head2 pointer-events-none"
            }`}
          >
            전체 전시회
          </span>
        </div>

        {/* 큰 타이틀: 스크롤 전에만 보임 */}
        <div
          className={`px-4 overflow-hidden transition-all duration-200 ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
          }`}
        >
          <Title title="전체 전시회" />
        </div>

        {/* 검색 + 필터 */}
        <div className="px-4 pb-6 flex flex-col gap-2.5">
          <SearchBar
            placeholder="전시회 제목을 검색해요."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <div className="flex gap-2.5">
            <FilterChip
              label="대학"
              options={univs}
              selected={selectedUniv}
              onSelect={setSelectedUniv}
            />
            <FilterChip
              label="학과"
              options={depts}
              selected={selectedDept}
              onSelect={setSelectedDept}
            />
          </div>
        </div>
      </div>

      {/* 전시회 목록 */}
      <section className="flex flex-col flex-1 px-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((exhibition) => (
            <Link key={exhibition.id} href={`/exhibition/${exhibition.id}`}>
              <ExhibitionCard {...exhibition} />
            </Link>
          ))
        ) : (
          <EmptyState searchQuery={searchQuery} />
        )}
      </section>

      <MainFooter />
    </div>
  );
}
