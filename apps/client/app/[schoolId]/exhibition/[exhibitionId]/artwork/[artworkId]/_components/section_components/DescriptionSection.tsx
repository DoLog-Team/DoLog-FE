export const DescriptionSection = ({ content }: { content: string }) => (
  <section className="flex flex-col px-4 pb-6">
    <h3 className="text-lg font-semibold mb-4">작품 설명</h3>
    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">{content}</p>
  </section>
);