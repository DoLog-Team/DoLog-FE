import Image from "next/image";

interface NavItem {
    id: number;
    title: string;
    author: string;
    imageUrl: string;
}

interface PostNavigationProps {
    prevArtwork?: NavItem;
    nextArtwork?: NavItem;
}

export function PostNavigationSection({ prevArtwork, nextArtwork }: PostNavigationProps) {
    return (
        <section className="flex flex-col px-4 pb-6">
            <span className="text-body1-bold text-lighter pt-7 pb-2.5">
                작품 둘러보기
            </span>
            <hr className="border border-stroke-lighter"/>
            {prevArtwork && (
                <div className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2">
                    <Image
                        src={prevArtwork.imageUrl}
                        alt={prevArtwork.title}
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-body1-bold">{prevArtwork.title}</span>
                        <span className="text-body2 text-lighter">{prevArtwork.author}</span>
                    </div>
                    </div>
                    <Image src="/icons/arrowUp.svg" alt="이전" width={24} height={24}/>
                </div>
            )}
            <hr className="border border-stroke-lightest"/>
            {nextArtwork && (
                <div className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2">
                    <Image
                        src={nextArtwork.imageUrl}
                        alt={nextArtwork.title}
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-body1-bold">{nextArtwork.title}</span>
                        <span className="text-body2 text-lighter">{nextArtwork.author}</span>
                    </div>
                    </div>
                    <Image src="/icons/arrowDown.svg" alt="다음" width={24} height={24}/>
                </div>
            )}
        </section>
    );
}