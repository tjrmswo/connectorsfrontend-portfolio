// hooks/useAnimatedToast.ts
import { useState, useCallback } from "react";

interface ToastState {
  comment: string;
  status: number;
  state: boolean;
}

export const useAnimatedToast = (duration: number) => {
  const [toast, setToast] = useState<ToastState>({
    comment: "",
    status: 0,
    state: false,
  });
  const [shouldRender, setShouldRender] = useState(false);

  const showToast = useCallback(
    (comment: string, status: number) => {
      // 1. DOM에 추가
      setShouldRender(true);
      setToast({ comment, status, state: false });

      // 2. 약간의 딜레이 후 애니메이션 시작 (나타남)
      setTimeout(() => {
        setToast((prev) => ({ ...prev, state: true }));
      }, 10);

      // 3. duration 후 사라지는 애니메이션
      setTimeout(() => {
        setToast((prev) => ({ ...prev, state: false }));
      }, duration);

      // 4. 애니메이션 종료 후 DOM에서 제거
      setTimeout(() => {
        setShouldRender(false);
      }, duration + 300); // transition duration 고려
    },
    [duration],
  );

  return { toast, shouldRender, showToast, setToast };
};
