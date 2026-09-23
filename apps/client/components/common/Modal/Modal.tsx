"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import type { ButtonVariantsProps } from "@/components/common/Button/Button.styles";
import { modalStyles } from "./Modal.styles";

interface ModalAction {
	text: string;
	onClick: () => void;
	variant?: ButtonVariantsProps["variant"];
	disabled?: boolean;
}

interface ModalProps extends Dialog.DialogProps {
	title: string;
	description?: string;
	actions: ModalAction[];
	titleTone?: "default" | "danger";
	showCloseButton?: boolean;
	children?: React.ReactNode;
	className?: string;
}

export const Modal = ({
	title,
	description,
	actions,
	titleTone,
	showCloseButton = false,
	children,
	className,
	...props
}: ModalProps) => {
	return (
		<Dialog.Root {...props}>
			<Dialog.Portal>
				<Dialog.Overlay className={modalStyles.overlay} />
				<Dialog.Content className={`${modalStyles.content} ${className ?? ""}`}>
					<div className={modalStyles.header}>
						<Dialog.Title className={modalStyles.title({ tone: titleTone })}>{title}</Dialog.Title>
						{showCloseButton && (
							<Dialog.Close className={modalStyles.closeButton} aria-label="닫기">
								<Image src="/icons/close.svg" alt="" width={20} height={20} />
							</Dialog.Close>
						)}
					</div>
					{description && (
						<Dialog.Description className={modalStyles.description}>
							{description}
						</Dialog.Description>
					)}

					{children && <div className={modalStyles.body}>{children}</div>}

					<div className={modalStyles.footer}>
						{actions.map((action) => (
							<Button
								key={action.text}
								type="button"
								onClick={action.onClick}
								disabled={action.disabled}
								variant={action.variant ?? "cta"}
								className="min-h-11 flex-1"
							>
								{action.text}
							</Button>
						))}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
