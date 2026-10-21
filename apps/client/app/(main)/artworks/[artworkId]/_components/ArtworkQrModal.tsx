"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";

interface ArtworkQrModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	artworkId: string;
	title: string;
}

/**
 * 작품 QR 코드 확인 모달 — QR 은 작품 상세 주소로 프론트에서 만듦
 */
export function ArtworkQrModal({ open, onOpenChange, artworkId, title }: ArtworkQrModalProps) {
	const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!open || qrDataUrl) return;
		QRCode.toDataURL(`${window.location.origin}/artworks/${artworkId}`, { width: 512, margin: 1 })
			.then(setQrDataUrl)
			.catch(() => {});
	}, [open, qrDataUrl, artworkId]);

	const handleDownload = () => {
		if (!qrDataUrl) return;
		const link = document.createElement("a");
		link.href = qrDataUrl;
		link.download = `${title}_QR.png`;
		link.click();
	};

	return (
		<Modal
			open={open}
			onOpenChange={onOpenChange}
			title="QR 코드"
			description={
				<>
					<span className="text-body1-bold">{title}</span>의 QR 코드입니다.
				</>
			}
			showCloseButton
			actions={[
				{ text: "확인", variant: "assistive", onClick: () => onOpenChange(false) },
				{ text: "이미지 다운", variant: "primary", disabled: !qrDataUrl, onClick: handleDownload },
			]}
		>
			<div className="aspect-square w-full">
				{qrDataUrl && (
					// biome-ignore lint/performance/noImgElement: 브라우저에서 만든 data URL 이라 next/image 최적화 대상이 아님
					<img src={qrDataUrl} alt={`${title} QR 코드`} className="size-full" />
				)}
			</div>
		</Modal>
	);
}
