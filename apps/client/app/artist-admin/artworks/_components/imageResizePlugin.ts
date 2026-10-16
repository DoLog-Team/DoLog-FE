import { cn } from "@/lib/utils/cn";
import {
	artworkImageHTMLRenderer,
	decodeImageAlt,
	encodeImageAlt,
	IMAGE_SIZE_PRESETS,
	type ImageSize,
} from "@/lib/utils/markdownImageSize";

const SIZE_LABELS: Record<ImageSize, string> = { small: "작게", medium: "보통", large: "크게" };
const SIZE_ORDER: ImageSize[] = ["small", "medium", "large"];

// 이미지 너비를 시각적으로 표현하는 아이콘 (좁은/중간/넓은 사각형)
const SIZE_ICONS: Record<ImageSize, string> = {
	small:
		'<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4.5" width="6" height="9" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>',
	medium:
		'<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="4.5" width="11" height="9" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>',
	large:
		'<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="4.5" width="15" height="9" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>',
};

// @toast-ui/editor의 package.json exports 설정 때문에 PluginInfo/NodeView 타입을 직접
// import할 수 없어 필요한 부분만 느슨하게 로컬 정의
interface PmNode {
	attrs: { imageUrl?: string; altText?: string; [key: string]: unknown };
	type: { name: string };
}
interface PmEditorView {
	state: {
		tr: {
			setNodeMarkup: (pos: number, type: undefined, attrs: Record<string, unknown>) => unknown;
		};
	};
	dispatch: (tr: unknown) => void;
}

function createToolbar(activeSize: ImageSize, onSelect: (size: ImageSize) => void) {
	const toolbar = document.createElement("div");
	toolbar.className =
		"absolute -top-12 left-0 z-20 flex items-center gap-0.5 rounded-lg border border-stroke-lighter bg-bg-normal p-1 shadow-lg";

	for (const size of SIZE_ORDER) {
		const button = document.createElement("button");
		button.type = "button";
		button.title = SIZE_LABELS[size];
		button.innerHTML = SIZE_ICONS[size];
		button.className = cn(
			"flex size-8 items-center justify-center rounded-md text-light transition-colors hover:bg-fg-lighter",
			size === activeSize && "bg-fg-lighter text-strong",
		);
		button.addEventListener("mousedown", (e) => {
			// mousedown을 막아야 에디터 포커스/셀렉션이 안 날아가고 버튼 클릭이 먹힌다
			e.preventDefault();
			e.stopPropagation();
			onSelect(size);
		});
		toolbar.appendChild(button);
	}

	return toolbar;
}

// 작품 상세 정보 WYSIWYG 에디터에서 본문 이미지를 클릭하면 작게/보통/크게 버튼이 뜨고,
// 선택한 크기는 alt 텍스트에 숨긴 토큰으로 저장한다 (markdownImageSize.ts 참고).
export function imageResizePlugin() {
	return {
		toHTMLRenderers: artworkImageHTMLRenderer,
		wysiwygNodeViews: {
			image: (node: PmNode, view: PmEditorView, getPos: () => number | undefined) => {
				const wrapper = document.createElement("span");
				wrapper.className = "relative inline-block max-w-full align-top";

				const img = document.createElement("img");
				img.className = "block h-auto max-w-full cursor-pointer rounded-md";

				let toolbar: HTMLElement | null = null;
				let currentSize: ImageSize = "large";

				const handleOutsideClick = (e: MouseEvent) => {
					if (!wrapper.contains(e.target as Node)) closeToolbar();
				};

				function closeToolbar() {
					toolbar?.remove();
					toolbar = null;
					document.removeEventListener("mousedown", handleOutsideClick);
				}

				const applySize = (size: ImageSize) => {
					const pos = getPos();
					if (typeof pos !== "number") return;
					const { alt } = decodeImageAlt(node.attrs.altText ?? "");
					const tr = view.state.tr.setNodeMarkup(pos, undefined, {
						...node.attrs,
						altText: encodeImageAlt(alt, size),
					});
					view.dispatch(tr);
				};

				const openToolbar = () => {
					if (toolbar) return;
					toolbar = createToolbar(currentSize, (size) => {
						applySize(size);
						closeToolbar();
					});
					wrapper.appendChild(toolbar);
					document.addEventListener("mousedown", handleOutsideClick);
				};

				const render = (currentNode: PmNode) => {
					const { alt, size } = decodeImageAlt(currentNode.attrs.altText ?? "");
					currentSize = size;
					img.src = currentNode.attrs.imageUrl ?? "";
					img.alt = alt;
					img.style.width = IMAGE_SIZE_PRESETS[size];
				};

				img.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					openToolbar();
				});

				render(node);
				wrapper.appendChild(img);

				return {
					dom: wrapper,
					update: (updatedNode: PmNode) => {
						if (updatedNode.type.name !== "image") return false;
						render(updatedNode);
						return true;
					},
					destroy: () => {
						closeToolbar();
					},
					stopEvent: () => true,
					ignoreMutation: () => true,
				};
			},
		},
	};
}
