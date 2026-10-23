import { beforeEach, describe, expect, it, vi } from "vitest";
import { createLocalStorageStore } from "./local-storage-store";

const parseStrings = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item) => typeof item === "string")
    : null;

describe("createLocalStorageStore", () => {
  beforeEach(() => {
    const storage = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    });
    vi.stubGlobal("window", new EventTarget());
  });

  it("저장된 값이 없으면 기본값을 돌려준다", () => {
    const store = createLocalStorageStore("test", [], parseStrings);
    expect(store.get()).toEqual([]);
  });

  it("저장한 값을 다시 읽을 수 있다", () => {
    const store = createLocalStorageStore("test", [], parseStrings);
    store.set(["하루키", "소설"]);
    expect(store.get()).toEqual(["하루키", "소설"]);
  });

  it("값이 바뀌지 않았으면 같은 참조를 돌려준다 (useSyncExternalStore 무한 렌더 방지)", () => {
    const store = createLocalStorageStore("test", [], parseStrings);
    store.set(["하루키"]);
    expect(store.get()).toBe(store.get());
  });

  it("깨진 JSON이면 기본값을 돌려준다", () => {
    localStorage.setItem("test", "{broken");
    const store = createLocalStorageStore("test", [], parseStrings);
    expect(store.get()).toEqual([]);
  });

  it("형식이 맞지 않으면 기본값을 돌려준다", () => {
    localStorage.setItem("test", JSON.stringify({ not: "array" }));
    const store = createLocalStorageStore("test", [], parseStrings);
    expect(store.get()).toEqual([]);
  });

  it("값을 저장하면 구독자에게 알린다", () => {
    const store = createLocalStorageStore("test", [], parseStrings);
    const onChange = vi.fn();
    const unsubscribe = store.subscribe(onChange);

    store.set(["하루키"]);
    expect(onChange).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.set(["소설"]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
