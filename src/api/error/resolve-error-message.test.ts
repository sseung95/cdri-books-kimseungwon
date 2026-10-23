import { AxiosError, CanceledError, type AxiosResponse } from "axios";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
  NETWORK_ERROR_MESSAGE,
} from "./error-messages";
import { resolveErrorMessage } from "./resolve-error-message";

function errorWithResponse(status: number, data: unknown) {
  return new AxiosError("error", "ERR_BAD_REQUEST", undefined, undefined, {
    status,
    data,
  } as AxiosResponse);
}

describe("resolveErrorMessage", () => {
  it("카카오 공통 형식의 숫자 code로 메시지를 찾는다", () => {
    const error = errorWithResponse(401, { code: -401, msg: "no auth" });
    expect(resolveErrorMessage(error)).toBe(ERROR_MESSAGES["-401"]);
  });

  it("책 검색 API 형식의 errorType으로 메시지를 찾는다", () => {
    const error = errorWithResponse(401, {
      errorType: "AccessDeniedError",
      message: "wrong appKey",
    });
    expect(resolveErrorMessage(error)).toBe(ERROR_MESSAGES.AccessDeniedError);
  });

  it("매핑되지 않은 코드는 기본 메시지를 돌려준다", () => {
    const error = errorWithResponse(400, { code: -999 });
    expect(resolveErrorMessage(error)).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it("코드가 없는 응답은 기본 메시지를 돌려준다", () => {
    const error = errorWithResponse(500, "Internal Server Error");
    expect(resolveErrorMessage(error)).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it("응답을 받지 못하면 네트워크 오류 메시지를 돌려준다", () => {
    const error = new AxiosError("Network Error", "ERR_NETWORK");
    expect(resolveErrorMessage(error)).toBe(NETWORK_ERROR_MESSAGE);
  });

  it("취소된 요청은 메시지를 보여주지 않는다", () => {
    expect(resolveErrorMessage(new CanceledError())).toBeUndefined();
  });

  it("axios 에러가 아니면 기본 메시지를 돌려준다", () => {
    expect(resolveErrorMessage(new Error("boom"))).toBe(DEFAULT_ERROR_MESSAGE);
  });
});
