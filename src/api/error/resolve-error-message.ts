import axios from "axios";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
  NETWORK_ERROR_MESSAGE,
} from "./error-messages";

/**
 * 카카오 에러 응답 본문. API마다 형식이 달라서 둘 다 받는다.
 * - 공통: { code: -401, msg: "..." }
 * - 책 검색: { errorType: "AccessDeniedError", message: "..." }
 */
type KakaoErrorBody = { code?: number; errorType?: string };

/** 화면에 보여줄 공통 에러 메시지. undefined면 표시하지 않는다. */
export function resolveErrorMessage(error: unknown): string | undefined {
  if (axios.isCancel(error)) return undefined;

  if (axios.isAxiosError<KakaoErrorBody>(error)) {
    const data = error.response?.data;
    const code = data?.code ?? data?.errorType;
    if (code !== undefined && Object.hasOwn(ERROR_MESSAGES, String(code))) {
      return ERROR_MESSAGES[String(code)];
    }
    if (!error.response) return NETWORK_ERROR_MESSAGE;
  }
  return DEFAULT_ERROR_MESSAGE;
}
