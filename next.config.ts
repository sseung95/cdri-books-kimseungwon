import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 카카오 책 검색 API의 썸네일 이미지
    remotePatterns: [{ protocol: "https", hostname: "search1.kakaocdn.net" }],
  },
};

export default nextConfig;
