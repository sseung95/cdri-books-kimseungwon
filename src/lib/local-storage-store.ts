import { useSyncExternalStore } from "react";

// 같은 탭 안의 변경은 storage 이벤트가 발생하지 않아서 직접 알린다.
const CHANGE_EVENT = "local-storage-change";

export interface LocalStorageStore<T> {
  get: () => T;
  set: (value: T) => void;
  subscribe: (onChange: () => void) => () => void;
  fallback: T;
}

/**
 * localStorage의 한 키를 React와 동기화하는 저장소를 만든다.
 * @param parse 저장된 값이 올바른 형태인지 확인하고, 아니면 null을 돌려준다. (직접 수정·깨진 값 대비)
 */
export function createLocalStorageStore<T>(
  key: string,
  fallback: T,
  parse: (value: unknown) => T | null,
): LocalStorageStore<T> {
  // useSyncExternalStore는 값이 바뀌지 않았으면 같은 참조를 돌려받아야 해서, 마지막으로 읽은 값을 보관한다.
  let cachedRaw: string | null = null;
  let cachedValue = fallback;

  const get = () => {
    const raw = localStorage.getItem(key);
    if (raw === cachedRaw) return cachedValue;

    cachedRaw = raw;
    try {
      cachedValue =
        raw === null ? fallback : (parse(JSON.parse(raw)) ?? fallback);
    } catch {
      cachedValue = fallback;
    }
    return cachedValue;
  };

  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const subscribe = (onChange: () => void) => {
    window.addEventListener("storage", onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(CHANGE_EVENT, onChange);
    };
  };

  return { get, set, subscribe, fallback };
}

// 서버 렌더링 때는 localStorage가 없으므로 기본값으로 그린다.
export function useLocalStorageStore<T>(store: LocalStorageStore<T>) {
  return useSyncExternalStore(store.subscribe, store.get, () => store.fallback);
}
