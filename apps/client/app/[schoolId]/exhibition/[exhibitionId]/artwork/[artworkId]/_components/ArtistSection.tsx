import { Title } from "@/components/common/Title/Title";
import { ArtistCard, type ArtistCardProps } from "./components/ArtistCard"; // ArtistCardProps import 추가

export function ArtistSection({ authors }: { authors: ArtistCardProps["author"][] }) {
	return (
		<section className="flex flex-col px-4 pb-6 gap-4">
			<Title title="참여자" />
			<div className="flex flex-col gap-10">
				{authors.map((author, index) => (
					<ArtistCard key={index} author={author} />
				))}
			</div>
		</section>
	);
}
