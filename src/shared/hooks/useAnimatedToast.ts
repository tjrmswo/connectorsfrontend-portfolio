"use client";
import { useState, useCallback } from "react";
import { ToastState } from "../model/type";

export const useAnimatedToast = (duration: number) => {
  const [toast, setToast] = useState<ToastState>({
    comment: "",
    status: "",
    state: false,
  });
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  const showToast = useCallback(
    (comment: string, status: string) => {
      // 1. DOM에 추가
      setShouldRender(true);
      setToast({ comment, status, state: false });

      // 2. 약간의 딜레이 후 애니메이션 시작 (나타남)
      const startTimer = setTimeout(() => {
        setToast((prev) => ({ ...prev, state: true }));
      }, 10);

      // 3. duration 후 사라지는 애니메이션
      const disappearTimer = setTimeout(() => {
        setToast((prev) => ({ ...prev, state: false }));
      }, duration);

      // 4. 애니메이션 종료 후 DOM에서 제거
      const animationStopTimer = setTimeout(() => {
        setShouldRender(false);
      }, duration + 300); // transition duration 고려

      return () => {
        clearTimeout(startTimer);
        clearTimeout(disappearTimer);
        clearTimeout(animationStopTimer);
      };
    },
    [duration],
  );

  return { toast, shouldRender, showToast, setToast };
};
