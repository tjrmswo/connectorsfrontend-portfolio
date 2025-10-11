"use client";
import {
  AppleLoginButton,
  GoogleLoginButton,
  KakakoLoginButton,
  LoginHeader,
} from "@/features/auth";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { CommonToast } from "@/shared";
import { useState } from "react";

export default function Login() {
  const [showToast, setShowToast] = useState({
    comment: "",
    status: 0,
    state: false,
  });
  const params = useSearchParams();

  return (
    <div className="flex h-full w-full flex-col items-center justify-around p-[5px]">
      <LoginHeader />
      <Image
        className="relative bottom-[1rem] w-3/5 object-contain"
        src={"/intro.png"}
        alt="스플래시 스크린"
        width={100}
        height={150}
      />

      <div className="mb-[5rem] flex h-auto w-full flex-col items-center justify-between gap-[6px]">
        <KakakoLoginButton
          redirectPath={params.get("redirectPath")}
          setShowToast={setShowToast}
        />
        <GoogleLoginButton
          redirectPath={params.get("redirectPath")}
          setShowToast={setShowToast}
        />
        {/* 애플 로그인 */}
        <AppleLoginButton />
      </div>

      <button
        onClick={() => {
          setShowToast({ ...showToast, state: true });
          setTimeout(() => setShowToast({ ...showToast, state: false }), 1500);
        }}
      >
        test
      </button>

      {showToast.state && (
        <div className="fixed top-[2rem] translate-y-[10px] rounded-[6px] shadow-xl transition-all duration-1000 ease-in-out">
          <CommonToast
            content={showToast.comment}
            status={String(showToast.status)}
          />
        </div>
      )}
    </div>
  );
}
