import {
  createLocalStorageStore,
  useLocalStorageStore,
} from "@/lib/local-storage-store";

const MAX_HISTORY = 8;

const historyStore = createLocalStorageStore<string[]>(
  "search-history",
  [],
  (value) =>
    Array.isArray(value)
      ? value.filter((item) => typeof item === "string")
      : null,
);

export function useSearchHistory() {
  const histories = useLocalStorageStore(historyStore);

  // 최신 검색어를 맨 앞에 두고, 이미 있으면 맨 앞으로 옮긴다. 최대 개수를 넘으면 오래된 것부터 지운다.
  const add = (query: string) => {
    historyStore.set(
      [query, ...historyStore.get().filter((item) => item !== query)].slice(
        0,
        MAX_HISTORY,
      ),
    );
  };

  const remove = (query: string) => {
    historyStore.set(historyStore.get().filter((item) => item !== query));
  };

  return { histories, add, remove };
}
