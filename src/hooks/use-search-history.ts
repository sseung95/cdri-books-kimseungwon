import { useSyncExternalStore } from "react";

const STORAGE_KEY = "search-history";
const MAX_HISTORY = 8;
// 같은 탭 안의 변경은 storage 이벤트가 발생하지 않아서 직접 알린다.
const CHANGE_EVENT = "search-history-change";
const EMPTY: string[] = [];

// useSyncExternalStore는 값이 바뀌지 않았으면 같은 참조를 돌려받아야 해서, 마지막으로 읽은 값을 보관한다.
let cachedRaw: string | null = null;
let cachedHistories: string[] = EMPTY;

function read(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedHistories;

  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedHistories = Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === "string")
      : EMPTY;
  } catch {
    cachedHistories = EMPTY;
  }
  return cachedHistories;
}

function write(histories: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function useSearchHistory() {
  const histories = useSyncExternalStore(subscribe, read, () => EMPTY);

  // 최신 검색어를 맨 앞에 두고, 이미 있으면 맨 앞으로 옮긴다. 최대 개수를 넘으면 오래된 것부터 지운다.
  const add = (query: string) => {
    write(
      [query, ...read().filter((item) => item !== query)].slice(0, MAX_HISTORY),
    );
  };

  const remove = (query: string) => {
    write(read().filter((item) => item !== query));
  };

  return { histories, add, remove };
}
