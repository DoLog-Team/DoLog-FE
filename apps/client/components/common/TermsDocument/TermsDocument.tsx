import Link from "next/link";

// 문장 안에서 **굵게**, [링크](주소) 를 쓸 수 있고 줄바꿈은 \n
export type TermsBlock =
	| { type: "paragraph"; text: string }
	| { type: "table"; rows: { label: string; value: string }[] }
	| { type: "notice"; texts: string[] };

export interface TermsDocumentData {
	title: string;
	blocks: TermsBlock[];
}

interface TermsDocumentProps {
	blocks: TermsBlock[];
}

export const TermsDocument = ({ blocks }: TermsDocumentProps) => (
	<div className="flex flex-col gap-4 whitespace-pre-line">
		{blocks.map((block, index) => {
			const key = `${block.type}-${index}`;

			if (block.type === "table") {
				return (
					<table
						key={key}
						className="w-full border-collapse border border-stroke-lighter text-left"
					>
						<tbody>
							{block.rows.map(({ label, value }) => (
								<tr key={label} className="border-b border-stroke-lighter last:border-b-0">
									<th className="w-24 bg-fg-lighter p-2 align-top font-medium text-strong">
										{label}
									</th>
									<td className="p-2 align-top">{renderInline(value)}</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			}

			if (block.type === "notice") {
				return (
					<div key={key} className="flex flex-col gap-3 border-t border-stroke-lighter pt-4">
						{block.texts.map((text) => (
							<p key={text}>{renderInline(text)}</p>
						))}
					</div>
				);
			}

			return <p key={key}>{renderInline(block.text)}</p>;
		})}
	</div>
);

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[.+?\]\([^)]+\))/;

const renderInline = (text: string) =>
	text.split(INLINE_PATTERN).map((part, index) => {
		const key = `${index}-${part}`;
		if (part.startsWith("**")) return <strong key={key}>{part.slice(2, -2)}</strong>;

		const link = part.match(/^\[(.+)\]\(([^)]+)\)$/);
		if (link)
			return (
				<Link key={key} href={link[2]} className="font-medium underline">
					{link[1]}
				</Link>
			);

		return part;
	});
