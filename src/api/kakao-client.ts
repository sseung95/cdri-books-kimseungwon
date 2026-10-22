import axios from "axios";

export const kakaoClient = axios.create({
  baseURL: "https://dapi.kakao.com",
  timeout: 10_000,
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
  },
});
