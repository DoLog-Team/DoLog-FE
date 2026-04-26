export const ArtistSection = ({ authors }: { authors: any[] }) => (
	<section className="flex flex-col px-4 pb-6">
		<h3 className="text-lg font-semibold mb-6">작가 소개</h3>
		{authors.map((author, idx) => (
			<div key={idx} className="mb-8 last:mb-0">
				<div className="flex items-center gap-4 mb-3">
					<div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden" />
					<div>
						<p className="font-medium">{author.name}</p>
						<p className="text-xs text-gray-500">{author.role}</p>
					</div>
				</div>
				<p className="text-sm text-gray-600 leading-snug">{author.description}</p>
			</div>
		))}
	</section>
);
