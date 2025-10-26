"use client";
import { CSSLoader, CommonToast } from "@/shared";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAnimatedToast, useGoogleLogin } from "@/features/auth";

export default function Provider() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { toast, shouldRender, showToast } = useAnimatedToast(1500);
  const params = useSearchParams();
  const loginMutation = useGoogleLogin({ params, showToast });

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
      <div className="flex h-full w-full flex-col items-center">
        <CSSLoader />
        {shouldRender && (
          <div
            className={`fixed top-[2rem] rounded-lg border border-[#f4f4f4] shadow-xl transition-all duration-300 ease-in-out ${
              toast.state
                ? "translate-y-[0px] opacity-100"
                : "-translate-y-[-20px] opacity-0"
            }`}
          >
            <CommonToast
              content={toast.comment}
              status={String(toast.status)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
