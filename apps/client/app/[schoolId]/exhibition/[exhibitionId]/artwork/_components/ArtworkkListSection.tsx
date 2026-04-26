"use client";

import { Title } from "@/components/common/Title/Title";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import Filter from "./components/Filter";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { MOCK_ARTWORKS } from "@/app/(main)/_mocks/artwork";

const items = MOCK_ARTWORKS["전체"];

export default function() {
        return (
            <section className="flex flex-col px-4 pb-6">
                <Title title="작품 목록"/>
                <SearchBar placeholder="작품명, 작가명을 검색하세요"/>
                <Filter/>
                <CardGrid items={items}/>
                <ListCardGrid items={items}/>
            </section>
        )
}