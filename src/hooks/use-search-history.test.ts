import { describe, expect, it } from "vitest";
import { addSearchHistory } from "./use-search-history";

describe("addSearchHistory", () => {
  it("새 검색어를 맨 앞에 추가한다", () => {
    expect(addSearchHistory(["소설"], "하루키")).toEqual(["하루키", "소설"]);
  });

  it("이미 있는 검색어는 중복 없이 맨 앞으로 옮긴다", () => {
    expect(addSearchHistory(["소설", "하루키", "역사"], "하루키")).toEqual([
      "하루키",
      "소설",
      "역사",
    ]);
  });

  it("최대 8개까지 저장하고, 넘치면 오래된 것부터 지운다", () => {
    const histories = ["8", "7", "6", "5", "4", "3", "2", "1"];
    const result = addSearchHistory(histories, "9");

    expect(result).toHaveLength(8);
    expect(result[0]).toBe("9");
    expect(result).not.toContain("1");
  });
});
