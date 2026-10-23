"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";
import { resolveErrorMessage } from "@/api/error/resolve-error-message";
import { showToast, Toaster } from "@/components/ui/toast";

/** query·mutation 에러를 한 곳에서 처리한다. */
function createQueryClient(showError: (message: string) => void) {
  const handleError = (error: unknown) => {
    const message = resolveErrorMessage(error);
    if (message !== undefined) showError(message);
  };

  return new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function QueryProvider({ children }: { children: ReactNode }) {
  // 요청 간 캐시가 공유되지 않도록 컴포넌트마다 한 번만 생성한다.
  const [queryClient] = useState(() => createQueryClient(showToast));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
