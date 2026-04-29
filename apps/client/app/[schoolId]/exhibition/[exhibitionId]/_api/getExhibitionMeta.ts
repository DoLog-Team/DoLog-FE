interface ExhibitionMeta {
	id: string;
	title: string;
	description: string | null;
	image: string | null;
}

export async function getExhibitionMeta(exhibitionId: string): Promise<ExhibitionMeta | null> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/exhibition/${exhibitionId}/meta`,
		{ next: { revalidate: 3600 } },
	);

	if (!res.ok) return null;
	return res.json();
}
