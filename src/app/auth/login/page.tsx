"use client";
import {
  LoginHeader,
  LoginToast,
  SocialLoginList,
  useAnimatedToast,
} from "@/features/auth";
import Image from "next/image";
import { useLocalStorage, useCustomRouter } from "@/shared";
import { useCallback, useEffect, useState } from "react";

export default function Login() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { toast, shouldRender, setToast } = useAnimatedToast(1500);
  const { value: recentPlatform } = useLocalStorage("recentPlatform");
  const { navigate } = useCustomRouter();

  const handleSkipLogin = useCallback(() => {
    navigate({ path: "/home", type: "push" });
  }, [navigate]);

  useEffect(() => {
    // CSS 로드를 위한 약간의 딜레이
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-between p-[5px] transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <LoginHeader />
      <Image
        className="relative bottom-[1rem] w-3/5 object-contain"
        src={"/intro.png"}
        alt="스플래시 스크린"
        width={100}
        height={150}
      />

      <SocialLoginList
        redirectPath="/home"
        setToast={setToast}
        recentPlatform={recentPlatform}
        onSkipLogin={handleSkipLogin}
      />

      <LoginToast shouldRender={shouldRender} toast={toast} />
    </div>
  );
}
