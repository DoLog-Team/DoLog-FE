export const RelatedSection = ({ category }: { category: string }) => (
	<section className="flex flex-col px-4 pb-6">
		<h3 className="text-lg font-semibold mb-4">동일한 카테고리 작품</h3>
		<div className="grid grid-cols-2 gap-4">
			{/* MOCK_ARTWORKS[category] 맵 돌리기 */}
			<div className="aspect-square bg-white rounded-md shadow-sm p-4 text-xs text-center">
				작품 카드 예정
			</div>
			<div className="aspect-square bg-white rounded-md shadow-sm p-4 text-xs text-center">
				작품 카드 예정
			</div>
		</div>
	</section>
);
