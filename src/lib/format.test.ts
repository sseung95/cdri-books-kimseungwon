import { describe, expect, it } from "vitest";
import { formatAuthors } from "./format";

describe("formatAuthors", () => {
  it("저자가 한 명이면 이름만 보여준다", () => {
    expect(formatAuthors(["무라카미 하루키"])).toBe("무라카미 하루키");
  });

  it("저자가 여러 명이면 대표 저자 외 N명으로 보여준다", () => {
    expect(formatAuthors(["김상협", "이연숙", "노동규"])).toBe("김상협 외 2명");
  });

  it("저자가 없으면 빈 문자열을 돌려준다", () => {
    expect(formatAuthors([])).toBe("");
  });
});
