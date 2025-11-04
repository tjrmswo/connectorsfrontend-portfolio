"use client";
import { useEffect, useState } from "react";

export default function useTimeout() {
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    // CSS 로드를 위한 약간의 딜레이
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { isReady };
}
