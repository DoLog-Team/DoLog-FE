// @toast-ui/editor의 package.json exports 설정 때문에 타입을 직접 import할 수 없어 최소 형태로 로컬 정의
type MdHTMLConvertorContext = {
	getChildrenText: (node: unknown) => string;
	skipChildren: () => void;
};
type MdHTMLConvertor = (node: unknown, context: MdHTMLConvertorContext) => unknown;
type CustomHTMLRenderer = Record<string, MdHTMLConvertor>;

export type ImageSize = "small" | "medium" | "large";

export const IMAGE_SIZE_PRESETS: Record<ImageSize, string> = {
	small: "33%",
	medium: "66%",
	large: "100%",
};

const DEFAULT_SIZE: ImageSize = "large";
const SIZE_TOKEN_REGEX = /::size=(small|medium|large)$/;

// 이미지 표시 크기를 alt 텍스트에 숨겨서 저장한다. 본문 이미지는 임시저장 전엔 data URL,
// 이후엔 실제 URL이라 "URL에 크기 붙이기" 방식은 data URL을 깨뜨려서 쓸 수 없다 —
// alt 텍스트는 두 경우 모두 안전하게 왕복되는 유일한 필드라 여기 숨긴다.
export function encodeImageAlt(alt: string, size: ImageSize): string {
	const plainAlt = alt.replace(SIZE_TOKEN_REGEX, "");
	return size === DEFAULT_SIZE ? plainAlt : `${plainAlt}::size=${size}`;
}

export function decodeImageAlt(rawAlt: string): { alt: string; size: ImageSize } {
	const match = rawAlt.match(SIZE_TOKEN_REGEX);
	const size = (match?.[1] as ImageSize | undefined) ?? DEFAULT_SIZE;
	return { alt: rawAlt.replace(SIZE_TOKEN_REGEX, ""), size };
}

const escapeAttr = (value: string) =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// 작품 상세 설명 본문 이미지의 표시 크기(alt 텍스트에 숨긴 토큰)를 반영해 <img>를 렌더링한다.
// 에디터의 Preview 탭(customHTMLRenderer)과 공개 상세 페이지 Viewer 양쪽에서 같이 쓴다.
export const artworkImageHTMLRenderer: CustomHTMLRenderer = {
	image: (node, context) => {
		const { getChildrenText, skipChildren } = context;
		const { destination, title } = node as unknown as { destination: string; title: string };
		skipChildren();
		const { alt, size } = decodeImageAlt(getChildrenText(node));

		return {
			type: "openTag",
			tagName: "img",
			selfClose: true,
			attributes: {
				src: escapeAttr(destination),
				alt: escapeAttr(alt),
				style: `width:${IMAGE_SIZE_PRESETS[size]};max-width:100%;`,
				...(title && { title: escapeAttr(title) }),
			},
		};
	},
};
