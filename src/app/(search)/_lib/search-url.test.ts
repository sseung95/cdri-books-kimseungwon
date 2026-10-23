import { afterEach, describe, expect, it, vi } from "vitest";
import { parseTarget, pushSearchUrl } from "./search-url";

describe("parseTarget", () => {
  it("상세검색 조건이면 그대로 돌려준다", () => {
    expect(parseTarget("title")).toBe("title");
    expect(parseTarget("person")).toBe("person");
    expect(parseTarget("publisher")).toBe("publisher");
  });

  it("상세검색 조건이 아니면 undefined를 돌려준다 (전체 검색)", () => {
    expect(parseTarget(null)).toBeUndefined();
    expect(parseTarget("isbn")).toBeUndefined();
    expect(parseTarget("abc")).toBeUndefined();
  });
});

describe("pushSearchUrl", () => {
  const pushState = vi.fn();
  vi.stubGlobal("window", { history: { pushState } });

  afterEach(() => {
    pushState.mockClear();
  });

  const pushedUrl = () => pushState.mock.calls[0][2];

  it("검색어를 query로 넣는다", () => {
    pushSearchUrl("하루키");
    expect(pushedUrl()).toBe(`/?query=${encodeURIComponent("하루키")}`);
  });

  it("상세검색 조건이 있으면 target도 넣는다", () => {
    pushSearchUrl("하루키", "person");
    expect(pushedUrl()).toBe(
      `/?query=${encodeURIComponent("하루키")}&target=person`,
    );
  });

  it("검색어가 비면 초기 화면(/)으로 이동한다", () => {
    pushSearchUrl("", "person");
    expect(pushedUrl()).toBe("/");
  });
});
