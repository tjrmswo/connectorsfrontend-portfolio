"use client";
import { useFinishSignup } from "@/features/auth";
import { useAnimatedToast } from "@/shared";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const LoginToast = dynamic(
  () => import("@/features/auth").then((m) => m.LoginToast),
  { ssr: false },
);

export default function SignupFinish() {
  const { handleButton } = useFinishSignup();
  const { toast, shouldRender } = useAnimatedToast(1500);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-[2rem] p-[6px]">
      <div className="mt-14 flex h-4/5 w-full flex-col items-center justify-between gap-10">
        <div className="w-full text-center font-[Pretendard] text-2xl font-semibold text-[#212121]">
          회원가입이 완료되었습니다!
        </div>

        <Image
          className="w-4/6"
          src={"/images/auth/signupFinish.png"}
          alt="회원가입 완료"
          width={150}
          height={150}
        />

        <button
          className="text-md relative bottom-[2rem] flex h-14 w-4/5 cursor-pointer items-center justify-center gap-[12px] rounded-[0.5rem] bg-[#6E4DDC] font-semibold leading-[23px] text-[#fff]"
          onClick={handleButton}
        >
          커넥터즈 시작하기
        </button>

        {shouldRender && (
          <LoginToast toast={toast} shouldRender={shouldRender} />
        )}
      </div>
    </div>
  );
}
