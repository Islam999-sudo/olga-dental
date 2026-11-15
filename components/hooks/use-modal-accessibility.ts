"use client";

import { useEffect, useRef, type RefObject } from "react";

type Modal = { element: HTMLElement };
const modals: Modal[] = [];
const originalInert = new Map<HTMLElement, boolean>();
let originalOverflow = "";

function syncBackground() {
  originalInert.forEach((inert, element) => { element.inert = inert; });
  originalInert.clear();
  const top = modals.at(-1)?.element;
  if (!top) return;

  // Inert siblings at each ancestor level, without hiding the dialog itself.
  let branch = top;
  while (branch.parentElement) {
    for (const sibling of branch.parentElement.children) {
      if (sibling === branch || !(sibling instanceof HTMLElement) || sibling.hasAttribute("data-modal-backdrop")) continue;
      originalInert.set(sibling, sibling.inert);
      sibling.inert = true;
    }
    if (branch.parentElement === document.body) break;
    branch = branch.parentElement;
  }
}

const focusableSelector =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

export function useModalAccessibility(
  dialogRef: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
) {
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const element = dialogRef.current;
    if (!open || !element) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const modal = { element };
    if (!modals.length) originalOverflow = document.body.style.overflow;
    modals.push(modal);
    document.body.style.overflow = "hidden";
    syncBackground();

    const focusable = () => Array.from(element.querySelectorAll<HTMLElement>(focusableSelector))
      .filter((node) => node.tabIndex >= 0 && !node.closest("[inert]") && node.getClientRects().length > 0);
    const focusFirst = () => (element.querySelector<HTMLElement>("[data-autofocus]") ?? focusable()[0] ?? element).focus({ preventScroll: true });
    const frame = requestAnimationFrame(focusFirst);

    const handleKey = (event: KeyboardEvent) => {
      if (modals.at(-1) !== modal) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== "Tab") return;
      const nodes = focusable();
      const first = nodes[0];
      const last = nodes.at(-1);
      if (!first || !last) {
        event.preventDefault();
        element.focus({ preventScroll: true });
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === element)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const handleFocus = (event: FocusEvent) => {
      if (modals.at(-1) === modal && !element.contains(event.target as Node)) focusFirst();
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("focusin", handleFocus);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("focusin", handleFocus);
      modals.splice(modals.indexOf(modal), 1);
      syncBackground();
      if (!modals.length) document.body.style.overflow = originalOverflow;
      if (opener?.isConnected && !opener.closest("[inert]")) opener.focus({ preventScroll: true });
    };
  }, [dialogRef, open]);
}
