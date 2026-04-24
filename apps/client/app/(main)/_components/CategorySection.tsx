"use client";

import Link from "next/link";
import { useState } from "react";
import { CardGrid } from "@/components/common/Card/CardGrid";
import type { CardItem } from "@/components/common/Card/Card.types";
import { Chip } from "@/components/common/Chip/Chip";
import { Title } from "@/components/common/Title/Title";

interface Props {
  title: string;
  categories: string[];
  artworks: Record<string, CardItem[]>;
}

export default function CategorySection({
  title,
  categories,
  artworks,
}: Props) {
  const [selected, setSelected] = useState(categories[0]);

  return (
    <section className="flex flex-col px-4 pt-6">
      <Title title={title} />

      {/* 카테고리 칩 */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            selected={selected === category}
            type="assistive"
            onClick={() => setSelected(category)}
          />
        ))}
      </div>

      {/* 작품 그리드 */}
      <div className="mt-4">
        <CardGrid items={artworks[selected] ?? []} limit={4} />
      </div>

      {/* TODO: 추후 더보기 링크 이동 url 변경 필요 (전체 작품 페이지로) */}
      <Link
        href="/artworks"
        className="bg-fg-lighter text-element1 text-light text-center py-4 rounded-lg mt-7 mb-6"
      >
        더보기
      </Link>
    </section>
  );
}
