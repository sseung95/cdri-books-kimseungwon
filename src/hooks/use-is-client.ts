import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// 서버 렌더링과 hydration 중에는 false, 브라우저에서 화면이 준비된 뒤에는 true.
// localStorage처럼 브라우저에만 있는 값을 읽기 전에 자리 표시를 보여줄 때 쓴다.
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
