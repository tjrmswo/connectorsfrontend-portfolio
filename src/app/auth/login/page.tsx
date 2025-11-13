"use client";
import dynamic from "next/dynamic";
const LoginHeader = dynamic(
  () => import("@/features/auth").then((m) => m.LoginHeader),
  {
    loading: () => <div className="h-20 animate-pulse bg-gray-200" />,
    ssr: false,
  },
);

const GoogleLoginButton = dynamic(
  () => import("@/features/auth").then((m) => m.GoogleLoginButton),
  {
    loading: () => <div className="h-12 animate-pulse rounded bg-gray-200" />,
    ssr: false,
  },
);

const KakaoLoginButton = dynamic(
  () => import("@/features/auth").then((m) => m.KakaoLoginButton),
  {
    loading: () => <div className="h-12 animate-pulse rounded bg-gray-200" />,
    ssr: false,
  },
);

const AppleLoginButton = dynamic(
  () => import("@/features/auth").then((m) => m.AppleLoginButton),
  {
    loading: () => <div className="h-12 animate-pulse rounded bg-gray-200" />,
    ssr: false,
  },
);

const LoginToast = dynamic(
  () => import("@/features/auth").then((m) => m.LoginToast),
  { ssr: false },
);

import { RecentLoginBadge, useHandleSkipLogin } from "@/features/auth";
import Image from "next/image";
import { useAnimatedToast, useLocalStorage, useTimeout } from "@/shared";

export default function Login() {
  const { toast, shouldRender, setToast } = useAnimatedToast(1500);
  const { value: recentPlatform } = useLocalStorage("recentPlatform");
  const { handleSkipLogin } = useHandleSkipLogin();
  const { isReady } = useTimeout();
  const redirectPath = "/home";

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-start gap-32 p-[5px] transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <LoginHeader />

      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-center font-[Pretendard] text-sm font-normal text-[#424242]">
          커리어 로드맵 추천 솔루션
        </span>
        <Image
          className="w-3/5 object-contain"
          src={"/images/login/Logo.png"}
          alt="스크린"
          width={100}
          height={150}
          quality={100}
        />
      </div>

      <div className="mb-[5rem] flex h-auto w-full flex-col items-center justify-between gap-2">
        {/* 카카오 로그인 */}
        <div className="relative flex flex-row items-center">
          <KakaoLoginButton
            redirectPath={redirectPath}
            setShowToast={setToast}
          />
          {recentPlatform === "Kakao" && <RecentLoginBadge />}
        </div>

        {/* 애플 로그인 */}
        <div className="relative flex flex-row items-center">
          <AppleLoginButton />
          {recentPlatform === "Apple" && <RecentLoginBadge />}
        </div>

        {/* 구글 로그인 */}
        <div className="relative flex flex-row items-center">
          <GoogleLoginButton
            redirectPath={redirectPath}
            setShowToast={setToast}
          />
          {recentPlatform === "Google" && <RecentLoginBadge />}
        </div>

        {/* 로그인 없이 이용하기 */}
        <button onClick={handleSkipLogin}>
          <span className="text-center font-[Pretendard] text-xs font-normal text-[#9e9e9e] underline transition-colors hover:text-black">
            로그인 없이 이용하기
          </span>
        </button>
      </div>

      <LoginToast shouldRender={shouldRender} toast={toast} />
    </div>
  );
}
