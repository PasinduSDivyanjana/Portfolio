import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  closeLabel: string;
  className: string;
  children: ReactNode;
}
export function Modal({ open, onClose, label, closeLabel, className, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element.showModal();
    return () => {
      if (element.open) element.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className={className}
      aria-label={label}
      onCancel={onClose}
      onClose={() => {
        if (open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {open && (
        <>
          <button className="dialog-close" aria-label={closeLabel} onClick={onClose}>
            <X size={21} />
          </button>
          {children}
        </>
      )}
    </dialog>
  );
}
