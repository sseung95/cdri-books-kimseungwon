import { useEffect, useRef, type RefObject } from "react";

/**
 * 지금 열려 있는 요소들을 열린 순서대로 쌓아 둔다.
 * 팝업 안의 Select처럼 겹쳐 열렸을 때 Escape는 가장 나중에 열린 것만 닫는다.
 */
const openStack: symbol[] = [];

/** 열려 있는 동안 ref 바깥을 누르거나 Escape를 누르면 onDismiss를 호출한다. */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onDismiss: () => void,
) {
  // 매 렌더마다 새로 만들어지는 onDismiss 때문에 리스너가 다시 붙지 않도록 ref로 보관한다.
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  });

  useEffect(() => {
    if (!isOpen) return;

    const id = Symbol();
    openStack.push(id);

    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onDismissRef.current();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openStack.at(-1) !== id) return;
      onDismissRef.current();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      openStack.splice(openStack.indexOf(id), 1);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, isOpen]);
}
