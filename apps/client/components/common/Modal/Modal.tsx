"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { modalStyles } from "./Modal.styles";

interface ModalAction {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface ModalProps extends Dialog.DialogProps {
  title: string;
  description?: string;
  actions: ModalAction[];
  className?: string;
}

export const Modal = ({
  title,
  description,
  actions,
  className,
  ...props
}: ModalProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className={modalStyles.overlay} />
        <Dialog.Content className={`${modalStyles.content} ${className ?? ""}`}>
          <Dialog.Title className={modalStyles.title}>{title}</Dialog.Title>
          {description && (
            <Dialog.Description className={modalStyles.description}>
              {description}
            </Dialog.Description>
          )}

          <div className={modalStyles.footer}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={modalStyles.button({ variant: action.variant })}
              >
                {action.text}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
