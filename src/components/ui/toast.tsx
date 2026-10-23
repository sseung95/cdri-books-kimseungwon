"use client";

import { useSyncExternalStore } from "react";

const DURATION = 3000;
const MAX_TOASTS = 5;

interface ToastItem {
  id: number;
  message: string;
}

/** 컴포넌트 밖(React Query 전역 에러 처리 등)에서도 띄울 수 있도록 모듈 단위로 관리한다. */
let toasts: ToastItem[] = [];
let nextId = 0;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function remove(id: number) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
}

export function showToast(message: string) {
  const id = nextId++;
  // 최대 개수를 넘으면 오래된 것부터 지운다.
  toasts = [...toasts, { id, message }].slice(-MAX_TOASTS);
  emit();
  setTimeout(() => remove(id), DURATION);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const EMPTY: ToastItem[] = [];

export function Toaster() {
  const items = useSyncExternalStore(
    subscribe,
    () => toasts,
    () => EMPTY,
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-20 z-30 flex flex-col items-center gap-2 md:bottom-24"
    >
      {items.map((toast) => (
        <p
          key={toast.id}
          className="rounded-lg bg-black/85 px-4 py-3 text-center typo-body2 leading-5 text-white shadow-popup"
        >
          {toast.message}
        </p>
      ))}
    </div>
  );
}
