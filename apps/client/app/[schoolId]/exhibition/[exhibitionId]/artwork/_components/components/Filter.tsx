import { Chip } from "@/components/common/Chip/Chip";
import Image from "next/image";

export default function() {
    return (
        <div className="flex justify-between items-center mt-2.5 mb-6">
            {/* 필터 칩 */}
            <div className="flex gap-2.5">
                <Chip type="assistive" label="전체"/>
                <Chip type="custom" label="카테고리1"/>
            </div>

            {/* 보기 방식 토글 */}
            <div className="flex gap-1 p-1 h-8 rounded-2 border border-stroke-lightest">
                <Image src="/icons/list.svg" alt="리스트보기" width={24} height={24} />
                <div className="w-px h-full border border-stroke-lighter" />
                <Image src="/icons/album.svg" alt="갤러리보기" width={24} height={24}/>
            </div>
        </div>
    )
}