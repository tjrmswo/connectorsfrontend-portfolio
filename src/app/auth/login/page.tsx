"use client";
import {
  AppleLoginButton,
  GoogleLoginButton,
  KakakoLoginButton,
  LoginHeader,
  useAnimatedToast,
  useLocalStorage,
} from "@/features/auth";
import Image from "next/image";
import { CommonToast } from "@/shared/ui";
import { useEffect, useState } from "react";

export default function Login() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { toast, shouldRender, setToast } = useAnimatedToast(1500);
  const { value } = useLocalStorage("recentPlatform");
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

      <div className="mb-[5rem] flex h-auto w-full flex-col items-center justify-between gap-2">
        <div className="relative flex flex-row items-center">
          <KakakoLoginButton redirectPath={"/home"} setShowToast={setToast} />
          {value === "Kakao" && (
            <span className="absolute -right-11 rounded-2xl bg-black px-3 py-1 font-[Pretendard] text-sm text-white">
              최근 로그인
            </span>
          )}
        </div>
        <div className="relative flex flex-row items-center">
          <GoogleLoginButton redirectPath={"/home"} setShowToast={setToast} />
          {value === "Google" && (
            <span className="absolute -right-11 rounded-2xl bg-black px-3 py-1 font-[Pretendard] text-sm text-white">
              최근 로그인
            </span>
          )}
        </div>
        <div className="relative flex flex-row items-center">
          <AppleLoginButton />
          {value === "Apple" && (
            <span className="absolute -right-11 rounded-2xl bg-black px-3 py-1 font-[Pretendard] text-sm text-white">
              최근 로그인
            </span>
          )}
        </div>
      </div>

      {shouldRender && (
        <div
          className={`fixed top-[2rem] rounded-lg border border-[#f4f4f4] shadow-xl transition-all duration-300 ease-in-out ${
            toast.state
              ? "translate-y-[0px] opacity-100"
              : "-translate-y-[-20px] opacity-0"
          }`}
        >
          <CommonToast content={toast.comment} status={String(toast.status)} />
        </div>
      )}
    </div>
    // <div className="flex h-full w-full flex-col items-center justify-between p-[5px]">
    //   <LoginHeader />
    //   <Image
    //     className="relative bottom-[1rem] w-3/5 object-contain"
    //     src={"/intro.png"}
    //     alt="스플래시 스크린"
    //     width={100}
    //     height={150}
    //   />

    //   <div className="mb-[5rem] flex h-auto w-full flex-col items-center justify-between gap-2">
    //     <div className="relative flex flex-row items-center">
    //       <KakakoLoginButton redirectPath={"/home"} setShowToast={setToast} />
    //       {value === "Kakao" && (
    //         <span className="absolute -right-11 rounded-2xl bg-black px-3 py-1 font-[Pretendard] text-sm text-white">
    //           최근 로그인
    //         </span>
    //       )}
    //     </div>
    //     <div className="relative flex flex-row items-center">
    //       <GoogleLoginButton redirectPath={"/home"} setShowToast={setToast} />
    //       {value === "Google" && (
    //         <span className="absolute -right-11 rounded-2xl bg-black px-3 py-1 font-[Pretendard] text-sm text-white">
    //           최근 로그인
    //         </span>
    //       )}
    //     </div>
    //     <div className="relative flex flex-row items-center">
    //       <AppleLoginButton />
    //       {value === "Apple" && (
    //         <span className="absolute -right-11 rounded-2xl bg-black px-3 py-1 font-[Pretendard] text-sm text-white">
    //           최근 로그인
    //         </span>
    //       )}
    //     </div>
    //   </div>

    //   {shouldRender && (
    //     <div
    //       className={`fixed top-[2rem] rounded-lg border border-[#f4f4f4] shadow-xl transition-all duration-300 ease-in-out ${
    //         toast.state
    //           ? "translate-y-[0px] opacity-100"
    //           : "-translate-y-[-20px] opacity-0"
    //       }`}
    //     >
    //       <CommonToast content={toast.comment} status={String(toast.status)} />
    //     </div>
    //   )}
    // </div>
  );
}
