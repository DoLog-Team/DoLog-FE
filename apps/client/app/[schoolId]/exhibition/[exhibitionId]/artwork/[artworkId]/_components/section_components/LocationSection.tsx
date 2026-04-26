import { Title } from "@/components/common/Title/Title";
import Image from "next/image";

export function LocationSection() {
    return (
        <section className="flex flex-col px-4 pb-6">
        <Title title="작품 위치"/>
        <div className="relative w-full aspect-16/9">
                        <Image
                            src="/public/images/artwork.png"
                            alt="이미지"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
        </section>
    )
}