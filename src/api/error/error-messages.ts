/**
 * 서버 에러 코드(HTTP 상태 코드가 아님)별 기본 메시지
 * https://developers.kakao.com/docs/ko/rest-api/error-code
 */
export const ERROR_MESSAGES: Record<string, string> = {
  "-1": "카카오 서버에서 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
  "-2": "요청 값이 올바르지 않아요. 검색 조건을 확인해 주세요.",
  "-3": "검색 기능을 사용할 수 없는 상태예요. 관리자에게 문의해 주세요.",
  "-10": "요청이 많아 잠시 후 다시 시도해 주세요.",
  "-401": "서비스 인증에 문제가 있어요. 관리자에게 문의해 주세요.",
  "-9798": "카카오 서비스 점검 중이에요. 잠시 후 다시 이용해 주세요.",
  AccessDeniedError: "서비스 인증에 문제가 있어요. 관리자에게 문의해 주세요.",
};

/** 응답을 받지 못했을 때 (오프라인 등) */
export const NETWORK_ERROR_MESSAGE =
  "서버에 연결할 수 없어요. 인터넷 연결을 확인해 주세요.";

/** 매핑되지 않은 에러 */
export const DEFAULT_ERROR_MESSAGE =
  "요청 처리 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.";
