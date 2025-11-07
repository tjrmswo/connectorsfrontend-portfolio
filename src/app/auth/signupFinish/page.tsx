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
    <div className="flex size-full flex-col items-center justify-between gap-[2rem] p-[6px]">
      <div />
      <div className="relative bottom-[3rem] flex w-full flex-col items-center gap-5">
        <p className="font-[Pretendard] text-[1rem] font-normal leading-[26px] text-[#686868]">
          커리어 로드맵 추천 솔루션
        </p>
        <Image
          className="w-4/6 object-contain"
          src={"/images/login/signupFinishiLogo.jpg"}
          alt="회원가입완료 커넥터즈로고"
          width={150}
          height={150}
        />
        <p className="font-[Pretendard] text-[1rem] font-bold leading-[22px] text-[#1a1a1a]">
          회원가입 완료되었습니다!
        </p>
        <Image
          className="w-2/5 object-contain"
          src={"/images/login/connectorsBigLogo.jpg"}
          alt="회원가입완료 커넥터즈로고"
          width={200}
          height={200}
        />
      </div>

      <button
        className="relative bottom-[2rem] flex h-[3rem] w-4/5 cursor-pointer items-center justify-center gap-[12px] rounded-[0.5rem] bg-[#292C33] text-[18px] leading-[23px] text-[#fff] text-[500]"
        onClick={handleButton}
      >
        커넥터즈 시작하기
      </button>

      {shouldRender && <LoginToast toast={toast} shouldRender={shouldRender} />}
    </div>
  );
}
