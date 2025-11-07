"use client";
import { CSSLoader, useAnimatedToast } from "@/shared";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useKakaoLogin } from "@/features/auth";
import dynamic from "next/dynamic";

const LoginToast = dynamic(
  () => import("@/features/auth").then((m) => m.LoginToast),
  { ssr: false },
);

export default function Provider() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { toast, shouldRender, showToast } = useAnimatedToast(1500);
  const params = useSearchParams();
  const loginMutation = useKakaoLogin({ params, showToast });

  useEffect(() => {
    // CSS 로드를 위한 약간의 딜레이
    const timer = setTimeout(() => {
      setIsReady(true);
      loginMutation.mutate();
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex h-full w-full flex-col items-center transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <CSSLoader />
      {shouldRender && <LoginToast toast={toast} shouldRender={shouldRender} />}
    </div>
  );
}
